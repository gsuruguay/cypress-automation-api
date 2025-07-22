import { findByStatus } from '../api/pet/getPet';

describe('GET /pet/findByStatus', () => {
  it('Caso positivo - Búsqueda de pets por status available', () => {
    return findByStatus('available').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      res.body.forEach(pet => {
        expect(pet).to.have.property('status', 'available');
      });
    });
  });

  it('Caso negativo - Búsqueda de pets por status inválido', () => {
    return findByStatus('incorrecto').then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});
