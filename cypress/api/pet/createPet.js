export function createPet(petData) {
	return cy.request('POST', '/pet', petData);
}
  