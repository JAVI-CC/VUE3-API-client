describe('Pruebas en el registrar component', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.dataCy('footer-button-acceder').click()
        cy.dataCy('acceder-button-crear-cuenta').click()
        cy.dataCy('registrar-button-submit').should('be.disabled')
    })

    it('credenciales incorrectas, disparar el Modal dialog', () => {
        cy.get('[data-cy=registrar-input-nombre]').type('test')
        cy.get('[data-cy=registrar-input-email]').type('test@email.com')
        cy.get('[data-cy=registrar-input-password]').type('12345678')
        cy.get('[data-cy=registrar-input-password-confirmation]').type('12345678')
        cy.dataCy('registrar-button-submit').click()
        cy.dataCy('modal-button-confirm').click()
    });

    it('credenciales correctas y cerrar sesion', () => {
        cy.get('[data-cy=registrar-input-nombre]').type('cypress')
        cy.get('[data-cy=registrar-input-email]').type('cypress@email.com')
        cy.get('[data-cy=registrar-input-password]').type('12345678')
        cy.get('[data-cy=registrar-input-password-confirmation]').type('12345678')
        cy.dataCy('registrar-button-submit').click()
        cy.dataCy('footer-button-cerrar-sesion').click()

        //Comprobar el comportamiento del boton de cancelar
        cy.dataCy('modal-button-cancel').click()
        cy.dataCy('footer-button-cerrar-sesion').click()

        cy.dataCy('modal-button-confirm').click()
        cy.dataCy('footer-button-acceder').click()
        cy.dataCy('acceder-button-crear-cuenta').click()
    });

});