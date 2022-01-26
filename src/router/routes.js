import juegosRouter from '../modules/juegos/router'
import authRouter from '../modules/auth/router'

const routes = [
  {
    //layout
    path: '/',
    name: 'inicio',
    component: () => import('../modules/layout/views/MainLayout'),
    children: [
      //Juegos
      ...juegosRouter,
      //Auth
      ...authRouter
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
