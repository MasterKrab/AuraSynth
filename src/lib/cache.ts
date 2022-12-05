import type { BinaryFileContents } from "@tauri-apps/api/fs";
import {
  BaseDirectory,
  writeBinaryFile,
  writeTextFile,
  readBinaryFile,
  readTextFile,
  exists,
} from "@tauri-apps/api/fs";

export const addCacheBinaryFile = async (
  id: string,
  file: BinaryFileContents
) => await writeBinaryFile(id, file, { dir: BaseDirectory.Cache });

export const addCacheTextFile = async (id: string, file: string) =>
  await writeTextFile(id, file, { dir: BaseDirectory.Cache });

export const getCacheBinaryFile = async (id: string) =>
  await readBinaryFile(id, { dir: BaseDirectory.Cache });

export const getCacheTextFile = async (id: string) =>
  await readTextFile(id, { dir: BaseDirectory.Cache });

export const existCacheFile = async (id: string) =>
  await exists(id, { dir: BaseDirectory.Cache });
