import { findByStatus, findByTags } from '../api/pet/getPet';

describe('GET /pet/findByStatus y findByTags', () => {
  it('B´squeda de pets por status available', () => {
    return findByStatus('available').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      res.body.forEach(pet => {
        expect(pet).to.have.property('status', 'available');
      });
    });
  });
});
