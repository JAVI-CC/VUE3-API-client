import { api } from 'boot/axios'
import { Loading } from 'quasar'

export const login = async({ commit }, credentials) => {
    Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    const email = credentials.email
    const password = credentials.password
    try {
        const { data } = await api.post(`/api/auth/login`, { email, password })
        if (data.error) return data
        commit('setLogin', data)
        return true
    } catch (error) {
    } finally {
        Loading.hide()
    }
}

export const check = async({ commit }) => {
    try {
        const { data } = await api.get(`/api/auth/check`)
        commit('setCheckLogged', data)
        return data.logged
    } catch (error) {
    } finally {
    }
}

export const logout = async({ commit }) => {
    Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    try {
        const { data } = await api.post(`/api/auth/logout`)
        commit('setLogout')
        return true
    } catch (error) {
        commit('setLogout')
    } finally {
        Loading.hide()
    }
}

export const register = async({ commit }, credentials) => {
    Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    try {
        const { data } = await api.post(`/api/auth/register`, credentials)
        if (data.email[0] == "El correo electrónico ya ha sido registrado.") return data.email[0]
        commit('setLogin', data)
        return true
    } catch (error) {
    } finally {
        Loading.hide()
    }
}

