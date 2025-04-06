///<reference types="cypress" />

import contrato from '../contratos/produtos.contratos'

describe('Testes de API - Produtos', () => {
    
    let token
    beforeEach(() => {
        cy.token('fulano@qa.com' , 'teste').then(tkn => {
            token = tkn
        })
    });

    it('Deve validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        })
    });
    
    it('Deve listar produtos com sucesso - GET', () => {
        cy.request({
            method: 'GET',
            url: '/produtos'
        }).should((Response) => {
            expect(Response.status).to.equal(200)
            expect(Response.body).to.have.property('produtos')
        })

    });

    it('Deve cadastrar produto com sucesso - POST', () => {
        let produto = 'Produto ' + Math.floor(Math.random() * 10001)
        cy.cadastroProduto(token, produto, 50, 'Cabo USB tipo C', 56)
        .should((Response) => {
            expect(Response.status).to.equal(201)
            expect(Response.body.message).equal('Cadastro realizado com sucesso')
        })
    });
    it('Deve valiar mensagem de produto cadastrado anteriomente - POST', () => {
      cy.cadastroProduto(token, 'Cabo USB 001', 50, 'Cabo USB tipo C', 56)
      .should((Response) => {
         expect(Response.status).to.equal(400)
         expect(Response.body.message).equal('Já existe produto com esse nome')
      })
    });
    
    it('Deve editar um produto com  sucesso - PUT', () => {
        
        let produto = 'Produto editado ' + Math.floor(Math.random() * 10001)
        cy.cadastroProduto(token, produto, 50, 'edit', 56)
            .then((Response) => {
                let id = Response.body._id
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: {
                        Authorization: token
                    },
                    body: {
                        nome: produto,
                        preco: 700,
                        descricao: 'Produto editado',
                        quantidade: 99
                    }
                }).should((Response) => {
                    expect(Response.body.message).equal('Registro alterado com sucesso')
                    expect(Response.status).to.equal(200)
                })
            })
        
            
    });
    it('Deve DELETAR um produto com sucesso - DELETE', () => {
        cy.cadastroProduto(token, 'Produto para deletar', 50, 'Cabo USB tipo C', 56)
            .then(Response => {
                let id = Response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: {
                        Authorization: token
                    }
                }).should((Response) => {
                    expect(Response.body.message).equal('Registro excluído com sucesso')
                    expect(Response.status).to.equal(200)
                })
            })
        
    });
});