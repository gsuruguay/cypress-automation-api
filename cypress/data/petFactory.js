import { faker } from '@faker-js/faker';

export function generatePet(status = 'available') {
  return {
    id: Date.now(),
    name: faker.animal.cat(),
    photoUrls: [faker.image.url()],
    tags: [{ id: 1, name: 'tag1' }],
    status
  };
}
