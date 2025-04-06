///<reference types="cypress" />
import { faker } from "@faker-js/faker";
import contratos from '../contratos/usuarios.contratos';

describe('Testes da Funcionalidade Usuários', () => {
    
   
    it('Deve validar contrato de usuarios', () => {
    cy.request('usuarios').then(response => {
        return contratos.validateAsync(response.body)
    })
        });

   it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
        method: 'GET',
        url: 'usuarios',
    }).should((Response) => {
        expect(Response.status).to.equal(200)
        expect(Response.body).to.have.property('usuarios')

    })
    });

   it('Deve cadastrar um usuário com sucesso 0- POST', () => {
    let usuario =  faker.person.fullName()
    let email = faker.internet.email(usuario)
    
    cy.cadastroUsuario(usuario, email, 'teste').should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body.message).to.equal('Cadastro realizado com sucesso') 
    })
   })

   it('Deve validar um  email inválido - GET', () => {
    cy.cadastroUsuario('Lucas', 'lucas@qa.com', 'teste123')
    .should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal('Este email já está sendo usado')
    })

    });
 
   it('Deve editar um usuário previamente cadastrado', () => {
        
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        
    });
});
