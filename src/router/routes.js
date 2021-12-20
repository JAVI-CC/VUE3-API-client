import {isAuthenticatedGuard, isAlreadyAuthenticatedGuard} from '../modules/auth/router/authGuard'

const routes = [
  {
    //layout
    path: '/',
    name: 'inicio',
    component: () => import('../modules/layout/views/MainLayout'),
    children: [
      //Juegos
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
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "JuegoCrear" */ '/src/modules/juegos/views/FormAdd.vue'),
      },
      {
        path: '/editar/:slug',
        name: 'juego-editar',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "JuegoEditar" */ '/src/modules/juegos/views/FormUpdate.vue'),
      },
      
      //Auth
      {
        path: '/auth/acceder',
        name: 'acceder',
        beforeEnter: [ isAlreadyAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "Acceder" */ '/src/modules/auth/views/Acceder.vue'),
      },
      {
        path: '/auth/registrar',
        name: 'registrar',
        beforeEnter: [ isAlreadyAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "Registrar" */ '/src/modules/auth/views/Registrar.vue'),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
