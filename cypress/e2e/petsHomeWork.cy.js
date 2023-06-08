/// <reference types="cypress"/>
import pet  from '../fixtures/pet.json'
import { faker } from '@faker-js/faker';


pet.id = faker.number.int();
pet.name = faker.animal.cat.name;
pet.category.id = faker.number.int(3);
pet.category.name = faker.animal.type();

describe('Update pet with id using formdata', ()=>{
    beforeEach('Create pet', ()=>{
        console.log("Create pet");
        cy.request('POST', '/pet', pet).then( response =>{
          expect(response.status).to.be.equal(200); // по хорошему 201 Created статус должен быть
          expect(response.body.id).to.be.equal(pet.id);
          expect(response.body.name).to.be.equal(pet.name);
        });

        console.log(`Check pet is created by id: ${pet.id}`);
        cy.request({method: 'GET', url:`/pet/${pet.id}`, failOnStatusCode:false}).then( response =>{
            console.log(`Pet id: ${pet.id}`);
            expect(response.status).to.be.equal(200);
            expect(response.body.id).to.be.equal(pet.id);
            expect(response.body.name).to.be.equal(pet.name);
            expect(response.body.category.id).to.be.equal(pet.category.id);
            expect(response.body.category.name).to.be.equal(pet.category.name);
          });
    });

    it('Update pet by id using for4m data', ()=>{
        console.log(`Update pet by id ${pet.id}`);
        pet.name = 'Charly';
        pet.status = 'soldUPD';

        cy.request(
            {
                method: 'POST', 
                url: `/pet/${pet.id}`,
                form: true,
                failOnStatusCode: false,
                body:{
                    name: `${pet.name}`,
                    status: `${pet.status}`
                  }
            })
        .then(response =>{
            expect(response.status).to.be.equal(200);
            expect(response.body.message).to.be.equal(`${pet.id}`);
        });

        console.log(`Check that pet is updated: ${pet.id}`);
        cy.request({method: 'GET', url:`/pet/${pet.id}`, failOnStatusCode:false}).then( response =>{
            expect(response.status).to.be.equal(200);
            expect(response.body.name).to.be.equal(`${pet.name}`);
            expect(response.body.status).to.be.equal(`${pet.status}`);
          });

    });
    afterEach('Delete test pet', () =>{
        console.log(`Delete pet by id ${pet.id}`);
        cy.request('DELETE', `/pet/${pet.id}`).then(response =>{
            expect(response.status).to.be.equal(200); // по хорошему тут статус 204 должен быть 
            expect(response.body.message).to.be.equal(`${pet.id}`);
        });

        console.log(`Check that pet is not available: ${pet.id}`);
        cy.request({method: 'GET', url:`/pet/${pet.id}`, failOnStatusCode:false}).then( response =>{
            expect(response.status).to.be.equal(404);
            expect(response.body.message).to.be.equal("Pet not found");
          });
    });
});

describe('Delete pet', ()=>{
    beforeEach('Create pet', ()=>{
        console.log("Create pet");
        cy.request('POST', '/pet', pet).then( response =>{
          expect(response.status).to.be.equal(200); // по хорошему 201 Created статус должен быть
          expect(response.body.id).to.be.equal(pet.id);
          expect(response.body.name).to.be.equal(pet.name);
        });

        console.log(`Check pet is created by id: ${pet.id}`);
        cy.request({method: 'GET', url:`/pet/${pet.id}`, failOnStatusCode:false}).then( response =>{
            console.log(`Pet id: ${pet.id}`);
            expect(response.status).to.be.equal(200);
            expect(response.body.id).to.be.equal(pet.id);
            expect(response.body.name).to.be.equal(pet.name);
            expect(response.body.category.id).to.be.equal(pet.category.id);
            expect(response.body.category.name).to.be.equal(pet.category.name);
          });
    });

    it('Delete pet by id', ()=>{
        console.log(`Delete pet by id ${pet.id}`);
        cy.request('DELETE', `/pet/${pet.id}`).then(response =>{
            expect(response.status).to.be.equal(200); // по хорошему тут статус 204 должен быть 
            expect(response.body.message).to.be.equal(`${pet.id}`);
        });

        console.log(`Check that pet is not available: ${pet.id}`);
        cy.request({method: 'GET', url:`/pet/${pet.id}`, failOnStatusCode:false}).then( response =>{
            expect(response.status).to.be.equal(404);
            expect(response.body.message).to.be.equal("Pet not found");
          });

    });

});