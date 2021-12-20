import { Store } from '/src/store/index.js'

const isAuthenticatedGuard = async( to, from, next ) => {
    const logged = await Store.dispatch('auth/check')
    logged ? next() : next({name: 'acceder'})
}

const isAlreadyAuthenticatedGuard = async( to, from, next ) => {
    const logged = await Store.dispatch('auth/check')
    logged ? next({name: 'juegos'}) : next()
}

export {isAuthenticatedGuard, isAlreadyAuthenticatedGuard}