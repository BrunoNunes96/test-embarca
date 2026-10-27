describe('Testes de Backend (API) - Embarca.ai', () => {
  const apiUrl = 'https://sales-api.embarca.ai'

  // Headers padrões utilizados pela plataforma Embarca para requisições na API
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    XAPIKEY: '123456789',
    'X-API-TOKEN': 'eyJhbGciOiJIUzI1NiJ9.eyJvcGVyYXRvcl9pZCI6ImVtYmFyY2EtYWkifQ.4mhP96Hg7nnBIEdO9eS5K4X3QT6k9sGEAnsbkg6rE_c'
  }

  context('Endpoint de Localidades (/api/v1/locations)', () => {
    it('1. Deve consultar cidades com sucesso informando um termo válido (ex: Curitiba)', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/api/v1/locations`,
        qs: {
          query_text: 'Curitiba'
        },
        headers: defaultHeaders
      }).then((response) => {
        // Valida status code de sucesso
        expect(response.status).to.eq(200)

        // Valida cabeçalho de tipo de conteúdo
        expect(response.headers['content-type']).to.include('application/json')

        // Valida estrutura da lista retornada
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)

        // Valida os atributos da primeira cidade
        const firstCity = response.body[0]
        expect(firstCity).to.have.property('name')
        expect(firstCity).to.have.property('state')
        expect(firstCity).to.have.property('slug')
        expect(firstCity.name.toLowerCase()).to.include('curitiba')
      })
    })

    it('2. Deve retornar múltiplos resultados para busca parcial (ex: "São")', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/api/v1/locations`,
        qs: {
          query_text: 'São'
        },
        headers: defaultHeaders
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(1)

        // Todos os itens devem conter id e nome válidos
        response.body.forEach((location) => {
          expect(location).to.have.property('id')
          expect(location).to.have.property('name')
        })
      })
    })

    it('3. Deve retornar lista vazia ao pesquisar por localidade inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/api/v1/locations`,
        qs: {
          query_text: 'CidadeTotalmenteInexistenteXYZ999'
        },
        headers: defaultHeaders
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body).to.have.length(0)
      })
    })

    it('4. Deve validar tempo de resposta (SLA) abaixo de 2000ms', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/api/v1/locations`,
        qs: {
          query_text: 'Londrina'
        },
        headers: defaultHeaders
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.duration).to.be.lessThan(2000)
      })
    })

    it('5. Deve retornar 401 ou 422 ao tentar login com credenciais inválidas', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/api/v1/sessions`,
        failOnStatusCode: false, // Não quebra o teste em status de erro HTTP
        headers: defaultHeaders,
        body: {
          session: {
            email: 'usuario.invalido.teste@embarca.ai',
            password: 'senhaIncorreta123!'
          }
        }
      }).then((response) => {
        expect([401, 404, 422]).to.include(response.status)
        expect(response.body).to.exist
      })
    })

    it('6. Deve rejeitar requisição sem corpo de dados obrigatório', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/api/v1/sessions`,
        failOnStatusCode: false,
        headers: defaultHeaders,
        body: {}
      }).then((response) => {
        expect([400, 422, 500]).to.include(response.status)
      })
    })
  })
})
