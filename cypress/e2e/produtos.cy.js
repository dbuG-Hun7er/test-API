///<reference types="cypress" />
describe('Testes de API - Produtos', () => {
    
    let token
    beforeEach(() => {
        cy.token('fulano@qa.com' , 'teste').then(tkn => {
            token = tkn
        })
    });
    
    it('Litar produtos', () => {
        cy.request({
            method: 'GET',
            url: '/produtos'
        }).should((Response) => {
            expect(Response.status).to.equal(200)
            expect(Response.body).to.have.property('produtos')
        })

    })

    it.only('Cadastrar produto - POST', () => {
    
        cy.request({
            method: 'POST',
            url: '/produtos',
            headers: {authorization: token},
            body: {
                //todo: criar um faker
                "nome": "Cabo USB 005",
                "preco": 80,
                "descricao": "USB tipo C",
                "quantidade": 1000
              }
        }).should((Response) => {
            expect(Response.status).to.equal(201)
            expect(Response.body.message).equal('Cadastro realizado com sucesso')
        })
    })
});