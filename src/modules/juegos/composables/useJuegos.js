import { computed } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useStore } from 'vuex'
import { Notify, Screen } from 'quasar'


const useJuegos = () => {

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const makeString = (slug) => {
        let words = slug.split('-');

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ');
    }

    const resetOrder = async () => {
        const order = null
        store.commit('juegos/setOrder', order)
    }

    const resetOrderSearch = async () => {
        const order = null
        store.commit('juegos/setOrderSearch', order)
    }

    const juegosScreenItems = () => {
        let items = store.getters['juegos/items']
        if (!store.getters['juegos/items']) {
            if (Screen.width <= 1304) {
                items = 8
            } else if (Screen.width > 1304 && Screen.width <= 1622) {
                items = 8
            } else if (Screen.width > 1622 && Screen.width <= 1940) {
                items = 10
            } else if (Screen.width > 1940 && Screen.width <= 2258) {
                items = 12
            } else if (Screen.width > 2258 && Screen.width <= 2576) {
                items = 14
            } else if (Screen.width > 2576 && Screen.width <= 2894) {
                items = 16
            } else if (Screen.width > 2894 && Screen.width <= 3212) {
                items = 18
            } else if (Screen.width >= 3213)
                items = 20
        } else {
            return store.getters['juegos/items']
        }
        store.commit('juegos/setScreenItems', items)
        return items
    }

    const juegosInitial = async () => {
        const items = juegosScreenItems()
        const filters = { page: 1, order: { value: null }, items: items }
        if (route.params.genero) return fetchGenero(route.params.genero)
        else if (route.params.desarrolladora) return fetchDesarrolladora(route.params.desarrolladora)
        else if (route.params.search) return formSearch(makeString(route.params.search))
        return store.dispatch('juegos/fetchJuegos', filters)
    }

    const formSearch = async (keyword) => {
        let filter = 'nombre'
        let order = 'ASC'

        if (store.getters['juegos/order']) {
            if (store.getters['juegos/order'].value == 'nombreAsc') {
                filter = 'nombre'
                order = 'ASC'
            } else if (store.getters['juegos/order'].value == 'nombreDesc') {
                filter = 'nombre'
                order = 'DESC'
            } else if (store.getters['juegos/order'].value == 'fechaAsc') {
                filter = 'fecha'
                order = 'ASC'
            } else if (store.getters['juegos/order'].value == 'fechaDesc') {
                filter = 'fecha'
                order = 'DESC'
            }
        }

        const searchJuegos = {
            'search': keyword,
            'filter': filter,
            'order': order
        }

        const resp = await store.dispatch('juegos/searchJuegos', searchJuegos)

        if (!resp.error) {
            if (!store.getters['juegos/search'] || store.getters['juegos/search'] != keyword) {
                resetOrderSearch()
                order = 'ASC'
            } else if (store.getters['juegos/order']) {
                if (store.getters['juegos/order'].value == null) {
                    resetOrderSearch()
                    order = 'ASC'
                }
            }
        }

        return resp
    }

    const fetchJuegos = async () => {
        if (route.fullPath != "/") router.push({ name: "juegos" });
        const filters = { page: store.getters['juegos/page'], order: store.getters['juegos/order'], items: store.getters['juegos/items'] }
        const resp = await store.dispatch('juegos/fetchJuegos', filters)
        return resp
    }

    const fetchJuegosOrder = async () => {
        if (store.getters['juegos/search']) return formSearch(store.getters['juegos/search'])
        //else if (store.getters['juegos/desarrolladora']) return fetchDesarrolladora(store.getters['juegos/desarrolladora'])
        //else if (store.getters['juegos/genero']) return fetchGenero(store.getters['juegos/genero'])
        return fetchJuegos()
    }

    const fetchDesarrolladora = async (slug) => {
        if (route.fullPath != "/") router.push({ name: "juegos-desarrolladora", params: { desarrolladora: slug } });
        resetOrder()
        scrollTop()
        const resp = await store.dispatch('juegos/fetchJuegosByDesarrolladora', slug)
        return resp
    }

    const fetchGenero = async (slug) => {
        if (route.fullPath != "/") router.push({ name: "juegos-genero", params: { genero: slug } });
        resetOrder()
        scrollTop()
        const resp = await store.dispatch('juegos/fetchJuegosByGenero', slug)
        return resp
    }

    const deleteJuego = async (slug) => {
        const resp = await store.dispatch('juegos/deleteJuego', slug)
        await scrollTop()
        juegosHome()
        return resp
    }

    const notifSuccess = (message) => {
        Notify.create({
            type: 'positive',
            position: 'top',
            icon: 'check_circle',
            message,
        })
        if (route.name != "juego-editar" && route.fullPath != "/") router.push({ name: "juegos" });
    }

    const notifWarning = (message) => {
        Notify.create({
            type: 'warning',
            position: 'top',
            icon: 'warning',
            message,
        })
        if (route.name != "juego-editar" && route.fullPath != "/") router.push({ name: "juegos" });
    }

    const notifError = (message) => {
        Notify.create({
            type: 'negative',
            position: 'top',
            icon: 'cancel',
            message,
        })
        if (route.fullPath != "/") router.push({ name: "juegos" });
        juegosInitial()
    }

    const redirectJuegos = () => {
        router.go()
    }

    const redirectJuegosItem = () => {
        router.push({ name: "juegos" });
        juegosHome()
    }

    const scrollTop = () => {
        window.scrollTo(0, 10)
    }

    const item = async (slug = null) => {
        if (slug) await router.push({ name: 'juego-item', params: { slug } })
        return await store.dispatch('juegos/fetchJuego', route.params.slug)
    }

    const toItem = async (slug) => {
        router.push({ name: 'juego-item', params: { slug } })
    }

    const itemUpdate = async (imagen = null) => {
        if (imagen == null) {
            const juego = await store.dispatch('juegos/fetchJuego', route.params.slug)
            store.commit('juegos/setImageInitial', juego.imagen)
            return juego
        } else {
            store.commit('juegos/setImageInitial', imagen)
        }
    }

    const itemRedirectUpdate = async (slug) => {
        await store.dispatch('juegos/fetchJuego', slug)
        router.push({ name: 'juego-item', params: { slug } })
        await juegosHome()
    }

    const editChangeDesarrolladora = (desarrolladora) => {
        store.commit('juegos/setEditDesarrolladora', desarrolladora)
    }

    const editImagenBase64 = (imagenBase64) => {
        store.commit('juegos/setEditImagen', imagenBase64)
    }

    const getDesarrolladoras = async () => {
        let desarrolladoras = await store.dispatch('juegos/fetchDesarrolladoras')
        return desarrolladoras = desarrolladoras.map(function (des) {
            return des.nombre;
        });
    }

    const getGeneros = async () => {
        return await store.dispatch('juegos/fetchGeneros')
    }

    const crear = () => {
        router.push({ name: 'juego-crear' })
    }

    const addJuego = async (juego) => {
        scrollTop()
        return await store.dispatch('juegos/addJuego', juego)
    }

    const updateJuego = async (juego) => {
        scrollTop()
        return await store.dispatch('juegos/updateJuego', juego)
    }

    const toEditar = async (slug) => {
        await router.push({ name: 'juego-editar', params: { slug } })
    }

    const editar = async (slug) => {
        if (slug) await router.push({ name: 'juego-editar', params: { slug } })
        const juego = await store.dispatch('juegos/fetchJuego', route.params.slug)
        await itemUpdate(juego.imagen)
        return juego
    }

    const juegosHome = async () => {
        const items = juegosScreenItems()
        const filters = { page: 1, order: { value: null }, items: items }
        await store.dispatch('juegos/fetchJuegos', filters)
    }

    const webShareJuego = (name, slug) => {
        navigator.share({
            title: `JAVI-CC JUEGOS API: ${name}`,
            text: "Quasar vuejs client connected to laravel api server",
            url: slug,
        });
    }

    const addJuegoPusher = async (juego) => {
        if (!store.getters['juegos/desarrolladora'] && !store.getters['juegos/genero'] && !store.getters['juegos/order'] && !store.getters['juegos/search']) return await store.commit('juegos/setPusherAddJuego', juego)
    }

    const updateJuegoPusher = async (juego, oldSlug) => {
        return await store.commit('juegos/setPusherUpdateJuego', { juego, oldSlug })
    }

    return {
        //Methods
        addJuego,
        addJuegoPusher,
        crear,
        deleteJuego,
        editar,
        editChangeDesarrolladora,
        editImagenBase64,
        fetchDesarrolladora,
        fetchGenero,
        fetchJuegos,
        fetchJuegosOrder,
        formSearch,
        getDesarrolladoras,
        getGeneros,
        item,
        itemRedirectUpdate,
        itemUpdate,
        juegosInitial,
        juegosHome,
        notifError,
        notifSuccess,
        redirectJuegos,
        redirectJuegosItem,
        toEditar,
        toItem,
        updateJuego,
        updateJuegoPusher,
        webShareJuego,

        //Variables
        juegos: computed(() => store.getters['juegos/juegos']),
        juego: computed(() => store.getters['juegos/juego']),
        juegoSearch: computed(() => store.getters['juegos/search']),
        page: computed(() => store.getters['juegos/page']),
        desarrolladoraSelected: computed(() => store.getters['juegos/desarrolladora']),
        generos: computed(() => store.getters['juegos/generos']),
        generoSelected: computed(() => store.getters['juegos/genero']),
        orderSelected: computed({
            get() {
                return store.getters['juegos/order']
            },
            set(val) {
                if (val == null) val = { label: '', value: null }
                store.commit('juegos/setOrder', val)
            }
        }),
        isHome: computed(() => route.name == 'juegos'),
        isLoading: computed(() => store.getters['juegos/isLoading']),
        showButtonAdd: computed(() => store.getters['auth/logged'] && (route.name == 'juego-item' || route.name == 'juegos')),
        paginateActive: computed(() => store.getters['juegos/paginateActive']),
        //Update
        editNombre: computed({
            get() {
                return store.getters['juegos/editNombre']
            },
            set(val) {
                store.commit('juegos/setEditNombre', val)
            }
        }),
        editDesarrolladora: computed({
            get() {
                return store.getters['juegos/editDesarrolladora']
            },
            set(val) {
                store.commit('juegos/setEditDesarrolladora', val)
            }
        }),
        editDescripcion: computed({
            get() {
                return store.getters['juegos/editDescripcion']
            },
            set(val) {
                store.commit('juegos/setEditDescripcion', val)
            }
        }),
        editGeneros: computed({
            get() {
                return store.getters['juegos/editGeneros']
            },
            set(val) {
                let arrGeneros = []
                for (let i = 0; i < val.length; i++) {
                    arrGeneros.push({ "nombre": val[i] });
                }
                store.commit('juegos/setEditGeneros', arrGeneros)
            }
        }),
        editImagen: computed({
            get() {
                return store.getters['juegos/editImagen']
            },
            set(val) {
                store.commit('juegos/setEditImagen', val)
            }
        }),
        editFecha: computed({
            get() {
                return store.getters['juegos/editFecha']
            },
            set(val) {
                store.commit('juegos/setEditFecha', val)
            }
        }),
        editSlug: computed(() => store.getters['juegos/editSlug']),
        imageInitial: computed(() => store.getters['juegos/imageInitial']),

    }
}

export default useJuegos