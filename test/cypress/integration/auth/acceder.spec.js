describe('Pruebas en el acceder component', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.dataCy('footer-button-acceder').click()
        cy.dataCy('acceder-button-submit').should('be.disabled')
    })
    
    it('credenciales incorrectas, disparar el Modal dialog', () => {
        cy.get('[data-cy=acceder-input-email]').type('cypress@email.com')
        cy.get('[data-cy=acceder-input-password]').type('12345678')
        cy.dataCy('acceder-button-submit').click()  
        cy.dataCy('modal-button-confirm').click()
    });

     it('credenciales correctas y cerrar sesion', () => {
        cy.get('[data-cy=acceder-input-email]').type('test@email.com')
        cy.get('[data-cy=acceder-input-password]').type('12345678')
        cy.dataCy('acceder-button-submit').click()
        cy.dataCy('footer-button-cerrar-sesion').click()

        //Comprobar el comportamiento del boton de cancelar
        cy.dataCy('modal-button-cancel').click()
        cy.dataCy('footer-button-cerrar-sesion').click()

        cy.dataCy('modal-button-confirm').click()
        cy.dataCy('footer-button-acceder').click()
     });

});