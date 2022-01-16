import { createStore } from 'vuex'
import auth from 'src/modules/auth/store'
import juegos from 'src/modules/juegos/store'
import layout from 'src/modules/layout/store'
import { layoutState } from './test-layout-state'
import { juegosState } from './test-juegos-state'

const createVuexStore = (authInitState, juegosInitState = juegosState, layoutInitState = layoutState) =>
    createStore({
        modules: {
            auth: {
                ...auth,
                state: { ...authInitState }
            },
            juegos: {
                ...juegos,
                state: { ...juegosInitState }
            },
            layout: {
                ...layout,
                state: { ...layoutInitState }
            }
        }
    })

export default createVuexStore