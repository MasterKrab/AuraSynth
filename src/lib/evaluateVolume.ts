const evaluateVolume = (value: number) => {
  const normalizedValue = Number(value.toFixed(1))

  if (normalizedValue === 0) return 'no'
  if (normalizedValue === 0.5) return 'medium'
  if (normalizedValue < 0.5) return 'low'
  return 'high'
}

export default evaluateVolume
