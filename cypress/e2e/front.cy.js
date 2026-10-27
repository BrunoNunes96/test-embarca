
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})

describe('Fluxo de Busca de Passagens - Embarca.ai', () => {
  beforeEach(() => {
    cy.visit('/')
    
    cy.get('#ai-search-coachmark-close').click()
    
  })

  it('Deve validar o carregamento dos itens base da página.', () => {
    cy.get('#hero-banner-desktop').should('be.visible')
    cy.get('#header-embarca-nav').should('be.visible')
    cy.get('.overflow-hidden > .justify-between').should('be.visible')
    cy.get('#main-content').should('be.visible')
  })

  it('Deve testar a mensagem de erro com campos de busca em vazios.', () => {
    cy.get('#search-desktop-submit-button').click()
    cy.get('.go3958317564').should('contain', 'Preencha os campos de origem e destino para buscar passagens.')
  })

  it('Deve testar o fluxo de busca com sucesso.', () => {
    cy.get('#search-desktop-origin-input')
      .click()
      .type('Curitiba')
    cy.get('#search-desktop-origin-results-option-0').click()
    cy.get('#search-desktop-destination-input').click()
    cy.get('#search-desktop-destination-input')
      .click()
      .type('Londrina')
    cy.get('#search-desktop-destination-results-option-0').click()
    cy.get('#search-desktop-submit-button').click()
    //Valida a busca realizada
    cy.get('#ticket-list-desktop-results > :nth-child(1)')
      .should('be.visible')
      .contains('Selecionar').click()

  })
})