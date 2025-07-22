export function deletePet(petId, options = {}) {
  return cy.request({
    method: 'DELETE',
    url: `/pet/${petId}`,
    failOnStatusCode: options.failOnStatusCode !== undefined
      ? options.failOnStatusCode
      : true
  });
}