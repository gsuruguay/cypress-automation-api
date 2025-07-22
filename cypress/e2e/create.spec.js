import { createPet } from '../api/pet/createPet';
import { generatePet } from '../data/petFactory';

describe('POST /pet', () => {
  it('debe crear un pet correctamente', () => {
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
});
