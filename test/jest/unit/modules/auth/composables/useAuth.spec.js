import useAuth from "src/modules/auth/composables/useAuth"
import { LocalStorage, Notify } from 'quasar'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/logged': true,
        'auth/nombre': 'test'
    }
}

jest.mock('vuex', () => ({
    //useStore por que se esta llamando en el vuex de useAuth
    useStore: () => mockStore
}))

Notify.create = () => {
    return jest.fn()
}

const mockRoute = { fullPath: jest.fn() }
const mockRouter = { push: jest.fn() }

jest.mock('vue-router', () => ({
    useRoute: () => mockRoute,
    useRouter: () => mockRouter
}))

describe('Pruebas en useAuth', () => {

    beforeEach(() => jest.clearAllMocks())

    test('login exitoso', async () => {

        const { login } = useAuth()

        mockStore.dispatch.mockReturnValue(true)

        const loginForm = await login('test@email.com', '12345678')
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/login', { email: 'test@email.com', password: '12345678' })

        expect(loginForm).toBeTruthy()

    })

    test('login fallido, las creedenciales no son correctas', async () => {

        const { login } = useAuth()

        mockStore.dispatch.mockReturnValue({ error: "Las credenciales no són correctas" })

        const loginForm = await login('test@email.com', 'pass1234')
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/login', { email: 'test@email.com', password: 'pass1234' })

        expect(loginForm).toEqual({ error: "Las credenciales no són correctas" })

    })

    test('register exitoso', async () => {

        const { register } = useAuth()

        mockStore.dispatch.mockReturnValue(true)

        const registerForm = await register('New User', 'newuser@email.com', '12345678', '12345678')
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/register', { name: 'New User', email: 'newuser@email.com', password: '12345678', password_confirmation: '12345678' })

        expect(registerForm).toBeTruthy()

    })

    test('register fallido, El correo ya esta registrado', async () => {

        const { register } = useAuth()

        mockStore.dispatch.mockReturnValue('El correo electrónico ya ha sido registrado.')

        const registerForm = await register('New Test', 'test@email.com', '12345678', '12345678')
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/register', { name: 'New Test', email: 'test@email.com', password: '12345678', password_confirmation: '12345678' })

        expect(registerForm).toBe('El correo electrónico ya ha sido registrado.')

    })

    test('loggedStatus exitoso', async () => {

        LocalStorage.set('token', 'ABC-123')
        const { loggedStatus } = useAuth()

        //seria false por que el valor del token no es valido
        mockStore.dispatch.mockReturnValue(true)

        const isLogged = await loggedStatus()
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/check')

        expect(isLogged).toBeTruthy()

    })

    test('loggedStatus token no almacenado en el Localstorage', async () => {

        LocalStorage.remove('token')
        const { loggedStatus } = useAuth()

        mockStore.dispatch.mockReturnValue(false)

        const isLogged = await loggedStatus()
        expect(isLogged).toBeFalsy()

    })

    test('logout', async () => {

        const { logout } = useAuth()
        mockStore.dispatch.mockReturnValue(true)

        const res = await logout()
        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/logout')
        
        expect(res).toBeTruthy()

    })

    test('logged, nombre', () => {
        const { logged, nombre } = useAuth()
        expect(logged.value).toBeTruthy()
        expect(nombre.value).toBe('test')
    })

    test('inicio ', () => {
        const { inicio } = useAuth()
        const res = inicio();
        expect(res).toBeUndefined();
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'juegos' })
    })

    test('inicio no redirecciona por que ya se encuentra en el inicio', () => {

        const mockRouteInicio = { fullPath: "/" }
        const mockRouter = { push: jest.fn() }
        jest.mock('vue-router', () => ({
            useRoute: () => mockRouteInicio,
            useRouter: () => mockRouter
        }))

        const { inicio } = useAuth()
        const res = inicio();
        expect(res).toBeUndefined();
        expect(mockRouter.push).not.toHaveBeenCalled()
    })

    test('toRegister ', () => {
        const { toRegister } = useAuth()
        const res = toRegister();
        expect(res).toBeUndefined();
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'registrar' })
    })

})