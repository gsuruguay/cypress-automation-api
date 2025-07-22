const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    specPattern: 'cypress/e2e/**/*.spec.js',
    defaultCommandTimeout: 10000, 
    requestTimeout: 15000, 
    setupNodeEvents(on, config) {
      // Registrar el plugin cypress-log-to-output
      require('cypress-log-to-output').install(on);

      // Registrar una tarea personalizada para loguear mensajes
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
  },
});
