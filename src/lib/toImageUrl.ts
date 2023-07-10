const toImageUrl = (mimeType: string, data: number[] | Uint8Array) => {
  const blob = new Blob([new Uint8Array(data)], { type: mimeType })
  return URL.createObjectURL(blob)
}

export default toImageUrl
