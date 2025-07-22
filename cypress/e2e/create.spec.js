import { createPet } from '../api/pet/createPet';
import { generatePet } from '../data/petFactory';

describe('POST /pet', () => {
  it('Caso positivo - Creación de un pet correctamente', () => {
    const pet = generatePet();

    createPet(pet).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include({
        id: pet.id,
        name: pet.name,
        status: pet.status
      });
      expect(res.body).to.have.property('photoUrls');
      expect(res.headers).to.have.property('content-type').and.include('application/json');
    });
  });

  it('Caso negativo - Creación de un pet sin campo obligatorio name', () => {
    const invalidPet = {
      id: Date.now(),
      photoUrls: [],
      tags: [],
      status: 'available'
    };

    return createPet(invalidPet, { failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(405);
      expect(res.body).to.have.property('message');
    });
  });

  it('Caso negativo - Creación de un pet con valor status inválido', () => {
    const invalidPet = {
      id: Date.now(),
      photoUrls: [],
      tags: [],
      status: 'inválido'
    };

    return createPet(invalidPet, { failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(405);
      expect(res.body).to.have.property('message');
    });
  });
});
