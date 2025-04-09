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

   it('Deve cadastrar um usuário com sucesso - POST', () => {
    let usuario =  faker.person.fullName()
    let email = faker.internet.email(usuario)
    
    cy.cadastroUsuario(usuario, email, 'teste', 'true').should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body.message).to.equal('Cadastro realizado com sucesso') 
    })
    })

   it('Deve validar um usuário com email inválido - GET', () => {
    cy.cadastroUsuario('Lucas', 'lucasqa.com', 'teste123', 'true')
    .should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body.email).to.equal('email deve ser um email válido')
    })

    });
 
   it('Deve editar um usuário previamente cadastrado - PUT', () => {
    let usuario =  faker.person.fullName()
    let email = faker.internet.email(usuario)
   
    cy.cadastroUsuario(usuario, email, 'teste', 'true')
    .then(response => {
        let id = response.body._id
        cy.request({
            method: 'PUT',
            url: `usuarios/${id}`,
            body: {
                nome: usuario + '- Editado',
                email: email,
                password: 'teste123',
                administrador: 'true'
            },
            
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Registro alterado com sucesso')
        })

    });
    });

    it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
        let usuario =  faker.person.fullName()
        let email = faker.internet.email(usuario)
       
        cy.cadastroUsuario(usuario, email, 'teste', 'true')
        .then(response => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
            }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
    });
});
})
