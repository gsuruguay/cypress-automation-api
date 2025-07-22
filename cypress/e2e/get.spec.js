import { createPet }     from '../api/pet/createPet';
import { waitForPet }    from '../api/pet/getPet';
import { generatePet }   from '../data/petFactory';

describe('GET /pet/{id}', () => {
  it('debe devolver un pet existente', () => {
    const pet = generatePet();

    // 1) Crear el pet
    createPet(pet).then((createRes) => {
      expect(createRes.status).to.eq(200);

      // 2) Esperar activamente a que el pet responda con 200
      return waitForPet(pet.id, { retries: 10, delay: 1000 });
    }).then((res) => {
      // 3) Validar la respuesta final
      expect(res.status).to.eq(200);
      expect(res.body).to.include({
        id: pet.id,
        name: pet.name,
        status: pet.status
      });
      expect(res.headers).to.have.property('content-type').and.include('application/json');
    });
  });

  it('debe retornar 404 si no existe el pet', () => {
    const fakeId = 13906;

    cy.request({
      method: 'GET',
      url: `/pet/${fakeId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.include('Pet not found');
    });
  });
});
