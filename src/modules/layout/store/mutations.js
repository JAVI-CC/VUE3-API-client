import { LocalStorage } from 'quasar'

export const themeDark = (state) => {
    state.dark = !state.dark
    LocalStorage.set('dark', state.dark)
}

export const themeInitial = (state, dark) => {
    state.dark = dark
}