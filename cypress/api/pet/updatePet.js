export function updatePet(petData) {
  return cy.request({
    method: 'PUT',
    url: '/pet',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: petData
  });
}

  