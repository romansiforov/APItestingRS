/// <reference types="cypress"/>
import pet  from '../fixtures/pet.json'
import { faker } from '@faker-js/faker';

pet.id = faker.number.int();
pet.name = faker.animal.cat.name;
pet.category.id = faker.number.int(3);
pet.category.name = faker.animal.type();

it('Create pet', () => {
  //cy.log(JSON.stringify(pet));
  console.log(`Pet id: ${pet.id}`);
    cy.request('POST', '/pet', pet).then( response =>{

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
    })
})

it('Get pet by id', () => {
  //cy.log(JSON.stringify(pet));
    cy.request('GET', `/pet/${pet.id}`).then( response =>{
      console.log(`Pet id: ${pet.id}`);
      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })
})

it('Update pet', () => {
  //cy.log(JSON.stringify(pet));
  console.log(`Pet id: ${pet.id}`);

  pet.name = 'Charly';
  pet.status = 'sold';
    cy.request('PUT', '/pet', pet).then( response =>{
      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.status).to.be.equal(pet.status);
    })

    cy.request('GET', `/pet/${pet.id}`).then( response =>{
      console.log(`Pet id: ${pet.id}`);
      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    });
})

it('Find pet by staus', () => {
  //cy.log(JSON.stringify(pet));

    cy.request('GET', `/pet/findByStatus?status=${pet.status}`).then( response =>{
      expect(response.status).to.be.equal(200);

      let pets = response.body;
      let resutlArray = pets.filter(myPet => {
        return myPet.id === pet.id;
      });
      console.log(resutlArray);
      expect(resutlArray[0]).to.be.eql(pet);
    })
})