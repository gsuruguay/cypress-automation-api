import { createPet }     from '../api/pet/createPet';
import { getPetById, waitForPet }    from '../api/pet/getPet';
import { generatePet }   from '../data/petFactory';

describe('GET /pet/{id}', () => {
  it('Caso positivo - Búsqueda de un pet existente', () => {
    const petId = 1008888;

    return getPetById(petId)
    .then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include({
        id: petId,
        name: "boby",
        status: "available"
      });
    });
  });

  it('Caso positivo - Creación de un pet y búsqueda del mismo', () => {
    const pet = generatePet();

    return createPet(pet).then((createRes) => {
      expect(createRes.status).to.eq(200);

      return waitForPet(pet.id, { retries: 10, delay: 1000 });
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include({
        id: pet.id,
        name: pet.name,
        status: pet.status
      });
    });
  });

  it('Caso negativo - Búsqueda de un pet con ID inexistente', () => {
    const fakeId = 13906;

    return cy.request({
      method: 'GET',
      url: `/pet/${fakeId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.include('Pet not found');
    });
  });
});
