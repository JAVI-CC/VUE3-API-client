import { LocalStorage } from 'quasar'

export const setLogin = (state, data) => {
    state.logged = true
    LocalStorage.set('token', data.token)
    delete data.token
    state.user = data
}

export const setCheckLogged = (state, data) => {
    state.logged = data.logged
    if(!data.logged) {
      LocalStorage.remove('token')
    } else {
      delete data.token
      state.user = data
    }
}

export const setLogout = (state) => {
    state.logged = false
    state.user = []
    LocalStorage.remove('token')
}