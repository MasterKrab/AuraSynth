export const THEME_KEY = 'theme'

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  DEVICE: 'device',
}

export type Theme = keyof typeof THEMES

export const getMatchMediaTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT

export const getTheme = () => {
  const isThemeSaved = localStorage.hasOwnProperty(THEME_KEY)

  if (!isThemeSaved) localStorage.setItem(THEME_KEY, THEMES.DEVICE)

  return localStorage.getItem(THEME_KEY) as Theme
}
