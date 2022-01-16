import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from "vue-router"
import { LocalStorage, Notify } from 'quasar'

const useAuth = () => {

  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const login = async (email, password) => {
    const credentials = { email: email, password: password }
    const resp = await store.dispatch('auth/login', credentials)
    return resp
  }

  const register = async (nombre, email, password, confirmPassword) => {
    const credentials = { name: nombre, email: email, password: password, password_confirmation: confirmPassword }
    const resp = await store.dispatch('auth/register', credentials)
    return resp
  }

  const toRegister = () => {
    router.push({ name: "registrar" });
  }

  const loggedStatus = async () => {
    if (LocalStorage.getItem('token')) {
      const resp = await store.dispatch('auth/check')
      return resp
    } else {
      return false
    }
  }

  const inicio = () => {
    if(route.fullPath != "/") router.push({ name: "juegos" });
  }

  const logout = async () => {    
    const resp = await store.dispatch('auth/logout')
    return resp
  }

  const notifLogin = () => {
    Notify.create({
      type: 'positive',
      position: 'top',
      icon: 'lock_open',
      message: 'Has iniciado sesión!',
    })
  }

  const notifAuth = () => {
    Notify.create({
      type: 'positive',
      position: 'top',
      icon: 'check_circle',
      message: 'Cuenta creada correctamente',
    })
  }

  const notifLogout = () => {
    Notify.create({
      type: 'dark',
      position: 'top',
      icon: 'lock',
      message: 'Has cerrado sesión!',
    })
  }

  return {
    //Methods
    inicio,
    loggedStatus,
    login,
    logout,
    notifAuth,
    notifLogin,
    notifLogout,
    register,
    toRegister,

    //Variables
    logged: computed(() => store.getters['auth/logged']),
    nombre: computed(() => store.getters['auth/nombre']),

  }
}

export default useAuth