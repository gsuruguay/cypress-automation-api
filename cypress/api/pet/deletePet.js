export function deletePet(petId) {
	return cy.request('DELETE', `/pet/${petId}`);
}
  