import { isAlreadyAuthenticatedGuard } from './authGuard'

export default [
    {
        path: '/auth/acceder',
        name: 'acceder',
        beforeEnter: [isAlreadyAuthenticatedGuard],
        component: () => import(/* webpackChunkName: "Acceder" */ '/src/modules/auth/views/Acceder.vue'),
    },
    {
        path: '/auth/registrar',
        name: 'registrar',
        beforeEnter: [isAlreadyAuthenticatedGuard],
        component: () => import(/* webpackChunkName: "Registrar" */ '/src/modules/auth/views/Registrar.vue'),
    },
]