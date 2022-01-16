import { api } from 'boot/axios'


describe('axios baseurl', () => {

    test('axios debe estar configurado con la api local de juegos test', () => {
        expect( api.defaults.baseURL ).toBe('http://127.0.0.1:8000')
    })

})