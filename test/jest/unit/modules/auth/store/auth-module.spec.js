import createVuexStore from "../../../mock-data/mock-store";
import { LocalStorage } from 'quasar'
import axios from 'axios'

describe('Vuex: Pruebas en el auth-module', () => {

    test('estado inicial', () => {

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        const { logged, user } = store.state.auth

        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
    })

    /**************************************** Mutations ****************************************/
    test('Mutation: setLogin', () => {

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        const payload = {
            token: 'ABC-123',
            name: 'Test',
            email: 'test@email.com',
        }

        store.commit('auth/setLogin', payload)

        const { logged, user } = store.state.auth

        expect(logged).toBeTruthy()
        expect(user).toEqual({ email: 'test@email.com', name: 'Test' })
        expect(LocalStorage.getItem('token')).toBeTruthy()
        expect(typeof LocalStorage.getItem('token')).toBe('string')
    })

    test('Mutation: setLogout', () => {

        LocalStorage.set('token', 'ABC-123')

        const store = createVuexStore({
            logged: true,
            user: {
                email: 'test@email.com',
                name: 'test',
            },
        })

        store.commit('auth/setLogout')

        const { logged, user } = store.state.auth

        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
        expect(LocalStorage.getItem('token')).toBeFalsy()
    })

    test('Mutation: setCheckLogged - false', () => {

        LocalStorage.set('token', 'ABC-123')

        const store = createVuexStore({
            logged: true,
            user: { email: "test@email.com", logged: true, name: "test" },
        })

        const payload = {
            false: true,
        }

        store.commit('auth/setCheckLogged', payload)

        const { logged, user } = store.state.auth

        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
        expect(LocalStorage.getItem('token')).toBeFalsy()
    })

    test('Mutation: setCheckLogged - true', () => {

        LocalStorage.set('token', 'ABC-123')

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        const payload = {
            logged: true,
            name: 'Test',
            email: 'test@email.com',
        }

        store.commit('auth/setCheckLogged', payload)

        const { logged, user } = store.state.auth

        expect(logged).toBeTruthy()
        expect(user).toEqual({ email: 'test@email.com', logged: true, name: 'Test' })
        expect(LocalStorage.getItem('token')).toBeTruthy()
        expect(typeof LocalStorage.getItem('token')).toBe('string')
    })

    /**************************************** Getters ****************************************/
    test('Getter: logged nombre', () => {

        const store = createVuexStore({
            logged: true,
            user: { email: 'test@email.com', logged: true, name: 'Test' },
        })

        expect(store.getters['auth/logged']).toBeTruthy()
        expect(store.getters['auth/nombre']).toBe('Test')
    })

    /**************************************** Actions ****************************************/
    test('Action: register - Error email ya existe', async () => {

        LocalStorage.remove('token')

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        const newUser = { name: 'Test', email: 'test@email.com', password: '12345678', password_confirmation: '12345678' }

        const res = await store.dispatch('auth/register', newUser)

        expect(res).toBe('El correo electrónico ya ha sido registrado.')

        const { logged, user } = store.state.auth

        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
        expect(LocalStorage.getItem('token')).toBeFalsy()
    })

    test('Action: login register - Inicia y crea el usuario', async () => {

        LocalStorage.remove('token')

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        //login
        const newUser = { name: 'test', email: 'test@email.com', password: '12345678', password_confirmation: '12345678' }
        const resLogin = await store.dispatch('auth/login', newUser)
        expect(resLogin).toBeTruthy()

        const { logged, user } = store.state.auth
        expect(logged).toBeTruthy()
        expect(user).toEqual({ name: 'test', email: 'test@email.com' })
        expect(LocalStorage.getItem('token')).toBeTruthy()
        expect(typeof LocalStorage.getItem('token')).toBe('string')
        const idToken = LocalStorage.getItem('token')

        //Eliminar el usuario
        await axios.delete('http://127.0.0.1:8000/api/auth/delete', {
            headers: {
                Authorization: idToken
            }
        })

        //Crear usuario
        const resRegister = await store.dispatch('auth/register', newUser)
        expect(resRegister).toBeTruthy()

        const { logged: loggedNewUser, user: registerUser } = store.state.auth
        expect(loggedNewUser).toBeTruthy()
        expect(registerUser).toEqual({ name: 'test', email: 'test@email.com' })
        expect(LocalStorage.getItem('token')).toBeTruthy()
        expect(typeof LocalStorage.getItem('token')).toBe('string')
        expect(LocalStorage.getItem('token')).not.toBe(idToken)
    })

    test('Action: login - Error creedenciales', async () => {

        LocalStorage.remove('token')

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        //login
        const loginUser = { email: 'test@email.com', password: 'pass1234' }
        const { error } = await store.dispatch('auth/login', loginUser)
        expect(error).toBe('Las credenciales no són correctas')

        const { logged, user } = store.state.auth
        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
        expect(LocalStorage.getItem('token')).toBeFalsy()
    })

    test('Action: check - true', async () => {

        LocalStorage.remove('token')

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        //login
        const loginUser = { email: 'test@email.com', password: '12345678' }
        await store.dispatch('auth/login', loginUser)

        //check
        const res = await store.dispatch('auth/check')
        expect(res).toBeTruthy()

        const { logged, user } = store.state.auth
        expect(logged).toBeTruthy()
        expect(user).toEqual({ email: "test@email.com", logged: true, name: "test" })
        expect(LocalStorage.getItem('token')).toBeTruthy()
        expect(typeof LocalStorage.getItem('token')).toBe('string')
    })

    test('Action: check - false', async () => {

        LocalStorage.set('token', 'ABC-123')

        const store = createVuexStore({
            logged: true,
            user: { email: "test@email.com", logged: true, name: "test" },
        })

        const res = await store.dispatch('auth/check')
        expect(res).toBeFalsy()

        const { logged, user } = store.state.auth
        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
        expect(LocalStorage.getItem('token')).toBeFalsy()
    })

    test('Action: logout', async () => {

        LocalStorage.set('token', 'ABC-123')

        const store = createVuexStore({
            logged: false,
            user: null,
        })

        //login
        const loginUser = { email: 'test@email.com', password: '12345678' }
        await store.dispatch('auth/login', loginUser)

        //logout
        const res = await store.dispatch('auth/logout')
        expect(res).toBeTruthy()

        const { logged, user } = store.state.auth
        expect(logged).toBeFalsy()
        expect(user).toBeFalsy()
        expect(LocalStorage.getItem('token')).toBeFalsy()
    })
})