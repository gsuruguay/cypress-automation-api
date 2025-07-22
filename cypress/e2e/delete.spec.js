import { createPet }    from '../api/pet/createPet';
import { deletePet }    from '../api/pet/deletePet';
import { generatePet }  from '../data/petFactory';

describe('DELETE /pet/{id}', () => {
  it('Caso positivo - Eliminación de un pet existente', () => {
    const pet = generatePet();

    return createPet(pet).then((createRes) => {
      expect(createRes.status).to.eq(200);
      cy.wait(10000);

      deletePet(pet.id).then((deleteRes) => {
        expect(deleteRes.status).to.eq(200);
        expect(deleteRes.body.message).to.include(pet.id);

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

  it('Caso negativo - Eliminar un pet inexistente', () => {
    const fakeId = Date.now();

    return deletePet(fakeId, { failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.be.empty;
      });
  });
});

