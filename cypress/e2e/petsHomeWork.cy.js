/// <reference types="cypress"/>
import pet  from '../fixtures/pet.json'
import { faker } from '@faker-js/faker';

it.skip('Update pet with id using formdata', ()=>{

});


pet.id = faker.number.int();
pet.name = faker.animal.cat.name;
pet.category.id = faker.number.int(3);
pet.category.name = faker.animal.type();

describe('Delete pet', ()=>{
    beforeEach('Create pet', ()=>{
        console.log("Create pet");
        cy.request('POST', '/pet', pet).then( response =>{
          expect(response.status).to.be.equal(200); // по хорошему 201 Created статус должен быть
          expect(response.body.id).to.be.equal(pet.id);
          expect(response.body.name).to.be.equal(pet.name);
        });

        console.log(`Check pet is created by id: ${pet.id}`);
        cy.request('GET', `/pet/${pet.id}`).then( response =>{
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
            expect(response.status).to.be.equal(200);
            
        });
    });

});