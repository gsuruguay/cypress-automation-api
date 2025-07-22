import { createPet }    from '../api/pet/createPet';
import { deletePet }    from '../api/pet/deletePet';
import { generatePet }  from '../data/petFactory';

describe('DELETE /pet/{id}', () => {
  it('Eliminación de un pet existente', () => {
    const pet = generatePet();

    createPet(pet).then((createRes) => {
      expect(createRes.status).to.eq(200);
      cy.wait(10000);

      deletePet(pet.id).then((deleteRes) => {
        expect(deleteRes.status).to.eq(200);

        cy.request({
          method: 'GET',
          url: `/pet/${pet.id}`,
          failOnStatusCode: false 
        }).then((getRes) => {
          expect(getRes.status).to.eq(404);
        });
      });
    });
  });
});

