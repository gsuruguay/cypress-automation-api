export function getPetById(petId) {
  return cy.request('GET', `/pet/${petId}`);
}   
  
export function findByStatus(status) {
	return cy.request('GET', `/pet/findByStatus?status=${status}`);
}

export function findByTags(tags) {
  const param = tags.join(',');
  return cy.request('GET', `/pet/findByTags?tags=${param}`);
}

// Helper de polling: reintenta GET /pet/{id} hasta status 200 o agota retries
export function waitForPet(petId, { retries = 8, delay = 1000 } = {}) {
  const attempt = (count) => {
    return cy.request({
      method: 'GET',
      url: `/pet/${petId}`,
      failOnStatusCode: false
    }).then((res) => {
      if (res.status === 200) {
        return res;
      }
      if (count < retries) {
        // esperar un poco y reintentar
        return cy.wait(delay).then(() => attempt(count + 1));
      }
      // si agotamos reintentos, lanzamos error para fallar el test
      throw new Error(`Pet ${petId} no disponible tras ${retries} intentos (último status ${res.status})`);
    });
  };

  return attempt(1);
}
