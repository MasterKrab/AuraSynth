export const encodeFilename = (text: string) =>
  text
    .replace(/[^a-z0-9]/gi, (char) => char.charCodeAt(0).toString(16))
    .replace(/ /g, "_");

export const decodeFilename = (text: string) =>
  text
    .replace(/([a-f0-9]{2})/gi, (hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/_/g, " ");
