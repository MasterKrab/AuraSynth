const shuffle = <T>(array: T[], firstElement: T) =>
  array.sort((a, b) => {
    if (a === firstElement) return -1
    if (b === firstElement) return 1
    return Math.random() - 0.5
  })

export default shuffle
