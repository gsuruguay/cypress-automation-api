# 🧪 Cypress API Automation - Swagger PetStore

Este proyecto implementa una solución **para pruebas automatizadas de API REST** utilizando **Cypress** para validar endpoints de [Swagger PetStore](https://petstore.swagger.io/).

## 📁 Estructura del Proyecto

```
cypress/
├── api/               # Métodos de capa de acceso API
│   └── pet/           # Endpoints relacionados con mascotas
├── data/              # Generadores de datos dinámicos (petFactory.js)
├── e2e/               # Especificaciones de prueba (specs)
│   ├── create.spec.js
│   ├── get.spec.js
│   ├── find.spec.js
│   ├── update.spec.js
│   └── delete.spec.js
└── support/           # Comandos y configuración
```

## 🔧 Tecnologías Utilizadas

- Cypress 14+
- Node.js
- JavaScript ES6+
- Swagger PetStore API (https://petstore.swagger.io/v2)

## ✅ Casos de Prueba Automatizados

### 🔹 `POST /pet` (create.spec.js)
- ✅ Caso positivo - Creación de un pet correctamente.
- ❌ Caso negativo - Creación de un pet sin campo obligatorio `name`. (Falla, comportamiento no esperado)
- ❌ Caso negativo - Creación de un pet con valor status inválido. (Falla, comportamiento no esperado)

### 🔹 `DELETE /pet/{id}` (delete.spec.js)
- ✅ Caso positivo - Eliminación de un pet existente.
- ❌ Caso negativo - Eliminar un pet inexistente.

### 🔹 `GET /pet/findByStatus?status={status}` (find.spec.js)
- ✅ Caso positivo - Búsqueda de pets por status available.
- ❌ Caso negativo - Búsqueda de pets por status inválido. (Falla, comportamiento no esperado)

### 🔹 `GET /pet/{id}` (get.spec.js)
- ✅ Caso positivo - Búsqueda de un pet existente.
- ✅ Caso positivo - Creación de un pet y búsqueda del mismo.
- ❌ Caso negativo - Búsqueda de un pet con ID inexistente.

### 🔹 `PUT /pet` (update.spec.js)
- ✅ Caso positivo - Actualización de pet existente.
- ❌ Caso negativo - Actualización de pet inexistente. (Falla, comportamiento no esperado)

## 🧠 Buenas Prácticas Aplicadas

- Separación por capas (`api`, `data`, `e2e`).
- Generación dinámica de datos para evitar colisiones (`generatePet`).
- Reintentos con espera activa para evitar errores por propagación (`waitForPet`).
- Validaciones del status code, contenido del body y headers.
- Manejo explícito de casos negativos con `failOnStatusCode: false`.

## ▶️ Instrucciones de Ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/gsuruguay/cypress-automation-api.git
cd cypress-automation-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar todas las pruebas en modo headless:
```bash
npx cypress run
```

4. O ejecutar en modo interactivo:
```bash
npx cypress open
```

## 🧪 Comandos Clave Cypress Usados

- `cy.request()` para llamadas HTTP directas.
- `cy.then()` y promesas encadenadas para manejar asincronía.
- `cy.task('log')` para debugging sin romper el flujo.

## ✍️ Autor

**Guillermo Suruguay**  
QA Automation Sr. | Web, API & E2E Testing  
LinkedIn: [linkedin.com/in/guillermo-suruguay-qa-automation-engineer-sdet](https://www.linkedin.com/in/guillermo-suruguay-qa-automation-engineer-sdet/)

---
