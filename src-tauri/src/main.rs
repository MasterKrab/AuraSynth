#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[derive(Clone, serde::Serialize)]
struct Picture {
    mime_type: String,
    picture_type: String,
    description: String,
    url: String,
}

#[derive(Clone, serde::Serialize)]
struct Song {
    title: Option<String>,
    artist: Option<String>,
    album: Option<String>,
    year: Option<u32>,
    track: Option<u32>,
    genre: Option<String>,
}

use id3::{Tag, TagLike};
use std::fs::{create_dir_all, File};
use std::io::Write;
use std::path::PathBuf;

fn replace_null(text: &str) -> String {
    text.replace("\0", "/")
}

#[tauri::command]
async fn read_song_metadata(path: &str) -> Result<Song, String> {
    let tag = match Tag::read_from_path(path) {
        Ok(tag) => tag,
        Err(e) => return Err(e.to_string()),
    };

    let title = if let Some(title) = tag.title() {
        Some(replace_null(title))
    } else {
        None
    };
    let artist = if let Some(artist) = tag.artist() {
        Some(replace_null(artist))
    } else {
        None
    };
    let album = if let Some(album) = tag.album() {
        Some(album.to_string())
    } else {
        None
    };
    let year = if let Some(year) = tag.year() {
        Some(year as u32)
    } else {
        None
    };

    let track = if let Some(track) = tag.track() {
        Some(track)
    } else {
        None
    };
    let genre = if let Some(genre) = tag.genre() {
        Some(genre.to_string())
    } else {
        None
    };

    Ok(Song {
        title,
        artist,
        album,
        year,
        track,
        genre,
    })
}

use base64;

fn to_image_url(picture: &id3::frame::Picture) -> String {
    let base64 = base64::encode(&picture.data);
    format!("data:{};base64,{}", &picture.mime_type, base64)
}

fn image_url_to_buffer(url: &str) -> Result<Vec<u8>, std::io::Error> {
    let base64 = url.split(',').last().unwrap();
    Ok(base64::decode(&base64).unwrap())
}

#[tauri::command]
fn write_image_url(path: String, data: &str) -> Result<(), String> {
    let mut folders_path = PathBuf::from(&path);
    folders_path.pop();

    match create_dir_all(folders_path) {
        Ok(_) => (),
        Err(e) => return Err(e.to_string()),
    }

    let mut file = match File::create(path) {
        Ok(file) => file,
        Err(e) => return Err(e.to_string()),
    };

    match file.write_all(&image_url_to_buffer(data).unwrap()) {
        Ok(_) => Ok(()),
        Err(e) => return Err(e.to_string()),
    }
}

#[tauri::command]
fn get_song_picture(path: &str) -> Result<Option<Picture>, String> {
    let tag = match Tag::read_from_path(path) {
        Ok(tag) => tag,
        Err(e) => return Err(e.to_string()),
    };

    let picture = tag.pictures().next();

    if let Some(picture) = picture {
        Ok(Some(Picture {
            mime_type: picture.mime_type.to_string(),
            picture_type: picture.picture_type.to_string(),
            description: picture.description.to_string(),
            url: to_image_url(&picture),
        }))
    } else {
        Ok(None)
    }
}

use tauri::{Manager, Window};

#[tauri::command]
async fn close_splashscreen(window: Window) {
    window
        .get_window("splashscreen")
        .expect("no window labeled 'splashscreen' found")
        .close()
        .unwrap();

    window
        .get_window("main")
        .expect("no window labeled 'main' found")
        .show()
        .unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            read_song_metadata,
            get_song_picture,
            write_image_url,
            close_splashscreen
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
