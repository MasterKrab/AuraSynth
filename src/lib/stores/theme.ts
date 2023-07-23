import type { Theme } from '../theme'

import { writable } from 'svelte/store'

import { THEME_KEY, THEMES, getTheme, getMatchMediaTheme } from '../theme'

export const createTheme = () => {
  const { subscribe, set } = writable<{
    value: Theme
  }>({
    value: getTheme(),
  })

  subscribe(({ value }) => {
    localStorage.setItem(THEME_KEY, value)

    for (const key in THEMES) {
      document.documentElement.classList.remove(`${THEMES[key]}-theme`)
    }

    const theme = value === THEMES.DEVICE ? getMatchMediaTheme() : value

    document.documentElement.classList.add(`${theme}-theme`)
  })

  return {
    subscribe,
    set,
  }
}

export default createTheme()
