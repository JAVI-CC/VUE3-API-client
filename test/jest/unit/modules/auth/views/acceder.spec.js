import { shallowMount } from '@vue/test-utils'
import Acceder from 'src/modules/auth/views/Acceder.vue'
import createVuexStore from "../../../mock-data/mock-store";
import { Notify, QBtn } from 'quasar'

const mockRoute = { fullPath: jest.fn() }
const mockRouter = { push: jest.fn() }

jest.mock('vue-router', () => ({
    useRoute: () => mockRoute,
    useRouter: () => mockRouter
}))

Notify.create = () => {
    return jest.fn()
}

describe('Pruebas en el Acceder Component', () => {

    let wrapper
    const store = createVuexStore({
        logged: false,
        user: null,
    })

    store.dispatch = jest.fn()

    beforeEach(() =>
        wrapper = shallowMount(Acceder, {
            global: {
                plugins: [store]
            }
        }),
        jest.clearAllMocks())

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Titulo debe de tener el valor por defecto "Iniciar sesión"', () => {
        const titulo = wrapper.find('.text-h4')
        expect(titulo.text()).toBe('Iniciar sesión')
    })

    test('credenciales incorrectas, disparar el Modal dialog', async () => {

        store.dispatch.mockReturnValueOnce({ error: "Las credenciales no són correctas" })
        await wrapper.find('[data-testid="form"]').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith("auth/login", { email: "", password: "" })
        expect(wrapper.vm.modalError).toBeTruthy()
        expect(wrapper.vm.modalMessageError).toBe('Las credenciales no són correctas')

        //Comprobar que el componente del modal-info exista
        const modalInfo = wrapper.find('modal-info-stub')
        expect(modalInfo.exists()).toBeTruthy()
        expect(modalInfo.attributes('open')).toBe("true")
    })

    test.skip('credenciales correctas, redirige juegos', async () => {
        store.dispatch.mockReturnValue(true)
        wrapper.vm.email = 'test@email.com'
        wrapper.vm.password = '12345678'

        await wrapper.find('[data-testid="form"]').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith("auth/login", { email: "test@email.com", password: "12345678" })
        expect(wrapper.vm.modalError).toBeFalsy()
        expect(wrapper.vm.email).toBe("")
        expect(wrapper.vm.password).toBe("")

        expect(mockRouter.push).toHaveBeenCalledWith({ "name": "juegos" });

        //Comprobar que el componente del modal-info exista
        const modalInfo = wrapper.find('modal-info-stub')
        expect(modalInfo.exists()).toBeTruthy()
        expect(modalInfo.attributes('open')).toBe("false")

    })

    test('clicar boton crear cuenta, redirige a registrar', async () => {

        const button = wrapper.findComponent(QBtn);
        await button.trigger('click');
        expect(mockRouter.push).toHaveBeenCalledWith({ "name": "registrar" });
    })

})