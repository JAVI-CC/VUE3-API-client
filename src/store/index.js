import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import auth from '../modules/auth/store'
import juegos from '../modules/juegos/store/'
import layout from '../modules/layout/store/'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = createStore({
  modules: {
    auth,
    juegos,
    layout,
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: process.env.DEBUGGING
})

export default store(function (/* { ssrContext } */) {
  return Store
})

export { Store }