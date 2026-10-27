describe('Fluxo de encomendas - embarca', () => {
    beforeEach(() => {
        cy.visit('https://demo.embarca.log.br/encomendas')
    })

    it('Fluxo Seleção de rota de envio', () => {

        cy.get(':nth-child(1) > .w-full > .relative > .flex-1')
            .first()
            .clear()
            .type('Curitiba')

        cy.contains('ul li, div', 'Curitiba')
            .should('be.visible')
            .click();

        cy.get(':nth-child(2) > .w-full > .relative > .flex-1').click()
            .clear()
            .type('Castro')

        cy.contains('ul li, div', 'Castro')
            .should('be.visible')
            .click()

        // Valida se criou a rota de envio
        cy.get('.leaflet-container').should('be.visible')

    })

    it('Fluxo de envio do pacote', () =>{
          cy.get(':nth-child(1) > .w-full > .relative > .flex-1')
            .first()
            .clear()
            .type('Curitiba')

        cy.contains('ul li, div', 'Curitiba')
            .should('be.visible')
            .click();

        cy.get(':nth-child(2) > .w-full > .relative > .flex-1').click()
            .clear()
            .type('Castro')

        cy.contains('ul li, div', 'Castro')
            .should('be.visible')
            .click()

        cy.get('.leaflet-container').should('be.visible')

        cy.get('#btn-encomendas-open-cotacao')
            .should('be.visible')
            .click()

        cy.get('#btn-cotacao-continue')
            .should('be.visible')
            .click()
    })

    it('Fluxo de renomear Pacote',()=>{

        cy.get('#input-encomendas-package-initial-name')
            .should('be.visible')
            .click()
            .clear()
            .type('Nome Teste')
    })

    it('Fluxo de exclusão de pacote', ()=>{

        cy.get('#btn-encomendas-add-package')
            .should('be.visible')
            .click()

        cy.get('#btn-encomendas-package-initial-remove > img')
            .should('be.visible')
            .click()
        cy.get('#btn-confirm-delete-confirm').click()
    })
})  