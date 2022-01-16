import { shallowMount } from '@vue/test-utils'
import Registrar from 'src/modules/auth/views/Registrar'
import createVuexStore from "../../../mock-data/mock-store";
import { Notify } from 'quasar'

const mockRoute = { fullPath: jest.fn() }
const mockRouter = { push: jest.fn() }

jest.mock('vue-router', () => ({
    useRoute: () => mockRoute,
    useRouter: () => mockRouter
}))

Notify.create = () => {
    return jest.fn()
}

describe('Pruebas en el Registrar Component', () => {

    let wrapper
    const store = createVuexStore({
        logged: false,
        user: null,
    })

    store.dispatch = jest.fn()

    beforeEach(() =>
        wrapper = shallowMount(Registrar, {
            global: {
                plugins: [store]
            }
        }),
        jest.clearAllMocks())

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Titulo debe de tener el valor por defecto "Registrate"', () => {
        const titulo = wrapper.find('.text-h4')
        expect(titulo.text()).toBe('Registrate')
    })

    test('error email ya ha sido registrado, disparar el Modal dialog', async () => {

        store.dispatch.mockReturnValue('El correo electrónico ya ha sido registrado.')
        await wrapper.find('[data-testid="form"]').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith("auth/register", { name: "", email: "", password: "", password_confirmation: "" })
        expect(wrapper.vm.modalError).toBeTruthy()
        expect(wrapper.vm.modalMessageError).toBe('El correo electrónico ya ha sido registrado.')

        //Comprobar que el componente del modal-info exista
        const modalInfo = wrapper.find('modal-info-stub')
        expect(modalInfo.exists()).toBeTruthy()
        expect(modalInfo.attributes('open')).toBe("true")

    })

    test.skip('cuenta creada correctamente, redirige juegos', async () => {

        store.dispatch.mockReturnValue(true)
        wrapper.vm.nombre = 'test'
        wrapper.vm.email = 'test@email.com'
        wrapper.vm.password = '12345678'
        wrapper.vm.confirmPassword = '12345678'

        await wrapper.find('[data-testid="form"]').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith("auth/register", { name: "test", email: "test@email.com", password: "12345678", password_confirmation: "12345678" })
        expect(wrapper.vm.modalError).toBeFalsy()
        expect(wrapper.vm.email).toBe("")
        expect(wrapper.vm.password).toBe("")
        expect(wrapper.vm.nombre).toBe("")
        expect(wrapper.vm.confirmPassword).toBe("")

        expect(mockRouter.push).toHaveBeenCalledWith({ "name": "juegos" })

        //Comprobar que el componente del modal-info exista
        const modalInfo = wrapper.find('modal-info-stub')
        expect(modalInfo.exists()).toBeTruthy()
        expect(modalInfo.attributes('open')).toBe("false")

    })

})