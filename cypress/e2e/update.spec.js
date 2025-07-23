import { updatePet }     from '../api/pet/updatePet';
import { waitForPet }    from '../api/pet/getPet';

describe('PUT /pet', () => {
  it('Caso positivo - Actualización de pet existente', () => {
    const petId   = 84138;
    const payload = {
      id: petId,
      name: 'Pet Update',
      photoUrls: ['pet_update.jpg']
    };

    return updatePet(payload)
      .then((putRes) => {
        expect(putRes.status).to.eq(200, 'PUT debe devolver 200');
        expect(putRes.headers)
          .to.have.property('content-type')
          .and.include('application/json');
        expect(putRes.body).to.include({
          id: petId,
          name: payload.name
        });
      })
      .then(() => {
        return waitForPet(petId, { retries: 10, delay: 1000 });
      })
      .then((getRes) => {
        expect(getRes.status).to.eq(200, 'GET tras PUT debe devolver 200');
        expect(getRes.body).to.include({
          id: petId,
          name: payload.name
        });
        expect(getRes.body.photoUrls)
          .to.be.an('array')
          .and.include.members(payload.photoUrls);
      });
  });
  
  it('Caso negativo - Actualización de pet inexistente', () => {
    const petId   = Date.now();
    const payload = {
      id: petId,
      name: 'Pet inexistente',
      photoUrls: ['img-inexistente.jpg']
    };

    return updatePet(payload)
      .then((putRes) => {
        expect(putRes.status).to.eq(400, 'PUT debe devolver 400');
      })
  });
});
