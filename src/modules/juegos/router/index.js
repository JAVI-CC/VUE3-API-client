import { isAuthenticatedGuard } from '../../../modules/auth/router/authGuard'

export default
    [
        {
            path: '',
            name: 'juegos',
            component: () => import(/* webpackChunkName: "Juegos" */ '/src/modules/juegos/views/Juegos.vue'),
        },
        {
            path: '/busqueda/:search',
            name: 'juegos-busqueda',
            redirect: { name: 'juegos' }
        },
        {
            path: '/:slug',
            name: 'juego-item',
            component: () => import(/* webpackChunkName: "JuegoItem" */ '/src/modules/juegos/views/JuegoItem.vue'),
        },
        {
            path: '/desarrolladora/:desarrolladora',
            name: 'juegos-desarrolladora',
            redirect: { name: 'juegos' }
        },
        {
            path: '/genero/:genero',
            name: 'juegos-genero',
            redirect: { name: 'juegos' }
        },
        {
            path: '/form/crear',
            name: 'juego-crear',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import(/* webpackChunkName: "JuegoCrear" */ '/src/modules/juegos/views/FormAdd.vue'),
        },
        {
            path: '/editar/:slug',
            name: 'juego-editar',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import(/* webpackChunkName: "JuegoEditar" */ '/src/modules/juegos/views/FormUpdate.vue'),
        },
    ]