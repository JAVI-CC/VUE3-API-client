import { computed } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useStore } from 'vuex'
import { LocalStorage } from 'quasar'

const useLayout = () => {

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const changeTheme = () => {
        store.commit('layout/themeDark')
    }

    const themeInitial = (dark) => {
        LocalStorage.getItem('dark') != null ? dark = LocalStorage.getItem('dark') : dark = dark
        store.commit('layout/themeInitial', dark)
        return dark
    }

    const toTop = () => {
        route.fullPath === "/" ? window.scrollTo({ top: 0, behavior: "smooth", }) : router.push({ name: "juegos" });
    }

    const inicio = async () => {
        const filters = { page: 1, order: { value: null }, items: store.getters['juegos/items'] }
        if (route.fullPath === "/") {
            window.scrollTo(0,10)
            await store.dispatch('juegos/fetchJuegos', filters)
        } else {
            router.push({ name: "juegos" });
        }
    }

    const busqueda = (search) => {
        router.push({ name: 'juegos-busqueda', params: { search } })
    }

    const webShare = () => {
        let url = route.fullPath
        if (store.getters['juegos/genero']) url = `/genero/${store.getters['juegos/genero']}`
        else if (store.getters['juegos/desarrolladora']) url = `/desarrolladora/${store.getters['juegos/desarrolladora']}`
        else if (route.params.search) url = `/busqueda/${route.params.search}`
        navigator.share({
            title: "JAVI-CC JUEGOS API",
            text: "Quasar vuejs client connected to laravel api server",
            url: url,
        });
    }

    return {
        //Methods
        busqueda,
        changeTheme,
        inicio,
        themeInitial,
        toTop,
        webShare,

        //Variables
        dark: computed(() => store.getters['layout/dark']),
    }
}

export default useLayout