const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds - minutes * 60

  return `${minutes}:${remainingSeconds.toFixed().padStart(2, '0')}`
}

export default formatSeconds
