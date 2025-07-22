export function updatePetWithForm(petId, formData) {
    return cy.request({
        method: 'POST',
        url: `/pet/${petId}`,
        form: true,
        body: formData
    });
}
  