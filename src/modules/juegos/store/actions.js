import { api } from 'boot/axios'
import { Loading } from 'quasar'

export async function fetchJuegos({ commit }, filters) {
    let {page, order, items} = filters
    if(order == null) order = { value: null} 
    if(page <= 1) Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    try {
        const { data } = await api.get(`/api/juegos/paginate?page=${page}&items=${items}&order=${order.value}`)
        commit('setJuegos', {data, page, order})
        return data
    } catch (error) {
    } finally {
    if(page <= 1) Loading.hide()
    }
}

export async function fetchJuego({ commit }, slug) {
    try {
        commit('setLoadingActivate')
        const { data } = await api.get(`/api/juegos/${slug}`)
        commit('setJuego', data)
        return data
    } catch (error) {
    } finally {
        commit('setLoadingDesactivate')
    }
}

export const searchJuegos = async ({ commit }, searchJuegos) => {
    Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    const { search, filter, order } = searchJuegos
    try {
        const { data } = await api.post('/api/juegos/filter/search', { search, filter, order })
        if (!data.error) commit('searchJuegos', { data, search })
        else return { error: true, message: data.error }
        return { error: false }
    } catch (error) {

    } finally {
        Loading.hide()
    }
}

export async function fetchJuegosByDesarrolladora({ commit }, slug) {
    Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    try {
        const { data } = await api.get(`/api/juegos/desarrolladoras/${slug}`)
        commit('setJuegosDesarrolladora', {data, page: 1, slug})
        return data
    } catch (error) {
    } finally {
        Loading.hide()
    }
}

export async function fetchJuegosByGenero({ commit }, slug) {
    Loading.show({ spinnerSize: 140, message: 'Cargando...' })
    try {
        const { data } = await api.get(`/api/juegos/generos/${slug}`)
        commit('setJuegosGenero', {data, page: 1, slug})
        return data
    } catch (error) {
    } finally {
        Loading.hide()
    }
}

export const deleteJuego = async ({ commit }, slug) => {
    Loading.show({ spinnerSize: 140, message: 'Eliminando juego...' })
    try {
        const { data } = await api.delete(`/api/juegos/delete/${slug}`)
        if (!data.error) commit('setJuegoDelete', slug)
        else return { error: true, message: data.error }
        return { error: false, message: data.success }
    } catch (error) {
        window.location.reload();
    } finally {
        Loading.hide()
    }
}

export async function fetchDesarrolladoras({ commit }) {
    try {
        const { data } = await api.get(`/api/juegos/desarrolladoras/show/all`)
        commit('setDesarrolladoras', data)
        return data
    } catch (error) {
    } finally {
    }
}

export async function fetchGeneros({ commit }) {
    try {
        const { data } = await api.get(`/api/juegos/generos/show/all`)
        commit('setGeneros', data)
        return data
    } catch (error) {
    } finally {
    }
}

export async function addJuego({ commit }, juego) {
    Loading.show({ spinnerSize: 140, message: 'Insertando juego...' })
    try {
        const { data } = await api.post(`/api/juegos`, juego)
        if (data.nombre != juego.nombre) return { error: true, message: data.nombre[0] }
        return { error: false, message: data.nombre }
    } catch (error) {
        window.location.reload();
    } finally {
        Loading.hide()
    }
}

export async function updateJuego({ commit }, juego) {
    Loading.show({ spinnerSize: 140, message: 'Actualizando juego...' })
    try {
        const { data } = await api.post(`/api/juegos/edit`, juego)
        if (data.nombre != juego.nombre) return { error: true, message: data.nombre[0] }
        return { error: false, slug: data.slug }
    } catch (error) {
        window.location.reload();
    } finally {
        Loading.hide()
    }
}