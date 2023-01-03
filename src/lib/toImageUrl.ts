const toImageUrl = (mimeType: string, data: number[]) => {
  const blob = new Blob([new Uint8Array(data)], { type: mimeType })
  return URL.createObjectURL(blob)
}

export default toImageUrl
