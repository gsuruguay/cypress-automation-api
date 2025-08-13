# Plan de Pruebas Manuales para la API Petstore - Recurso /pet

## Introducción

Este documento describe el plan de pruebas manuales para los endpoints relacionados al recurso `/pet` de la API Swagger Petstore, disponible en: https://petstore.swagger.io/#/. Se incluyen casos de prueba positivos y negativos para las operaciones principales: POST, GET, PUT y DELETE. 

## Operaciones

### 1. POST /pet

#### Caso Positivo: Agregar una nueva mascota con datos válidos

**Descripción:** Se agrega una nueva mascota a la tienda con todos los campos requeridos y opcionales proporcionados correctamente.

**Pasos:**

1. Enviar una solicitud POST a `https://petstore.swagger.io/v2/pet` con el siguiente cuerpo JSON:

```json
{
  "id": 10,
  "category": {
    "id": 1,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

2. Verificar que la respuesta tenga un código de estado 200.
3. Verificar que la mascota se haya agregado correctamente realizando una solicitud GET /pet/{petId} con el ID devuelto.

**Resultado Esperado:**

- Código de estado: 200
- La mascota se agrega correctamente y puede ser recuperada con GET /pet/{petId}.

#### Caso Positivo: Agregar una nueva mascota solo con campos obligatorios

**Descripción:** Se agrega una nueva mascota a la tienda solo completando los campos requeridos correctamente.

**Pasos:**

1. Enviar una solicitud POST a `https://petstore.swagger.io/v2/pet` con el siguiente cuerpo JSON, reemplazando `{idAleatorio}` por un número:

```json
{
  "id": {{idAleatorio}},
  "name": "firulais",
  "photoUrls": [
    "petstore.com/firulais.jpg"
  ]
} 
```

2. Verificar que la respuesta tenga un código de estado 200.
3. Verificar que la mascota se haya agregado correctamente realizando una solicitud GET /pet/{petId} con el ID devuelto.

**Resultado Esperado:**

- Código de estado: 200
- La mascota se agrega correctamente y puede ser recuperada con GET /pet/{petId}.

#### Caso Negativo: Intentar agregar una mascota sin campo obligatorio

**Descripción:** Se intenta agregar una mascota sin proporcionar el campo requerido "name".

**Pasos:**

1. Enviar una solicitud POST a `https://petstore.swagger.io/v2/pet` con el siguiente cuerpo JSON (sin el campo "name"):

```json
{
  "id": 100004,
  "category": {
    "id": 1,
    "name": "perros"
  },
  "photoUrls": [
    "petstore.com/mascota.jpg"
  ],
  "tags": [
    {
      "id": 0,
      "name": "favorito"
    }
  ],
  "status": "available"
}
```

2. Verificar que la respuesta tenga un código de estado 405 indicando un error.

**Resultado Esperado:**

- Código de estado: 405 (Invalid input).

### 2. POST /pet/{petId}/uploadImage

#### Caso Positivo: Subir una imagen válida 

**Descripción:** Se agrega una nueva imagen válida a una mascota existente.

**Pasos:**

1. Enviar una solicitud POST a `https://petstore.swagger.io/v2/pet/1555/uploadImage` con el siguiente form-data:

```
  additionalMetadata: imagen
  file: imagenMascota.jpg  
```

2. En el campo file se deberá subir una imagen válida, alojada localmente en el equipo y deberá llamarse "imagenMascota" en formato "jpg".
3. Verificar en el response que se haya agregado correctamente la imagen con el peso del archivo en bytes.

**Resultado Esperado:**

- Código de estado: 200.
- La imagen se agrega correctamente y puede ser recuperada con GET /pet/{petId}.

### 3. PUT /pet

#### Caso Positivo: Actualizar una mascota existente con datos válidos

**Descripción:** Se actualiza una mascota existente con nuevos datos completando los datos obligatorios.

**Pasos:**

1. Primero, agregar una nueva mascota usando POST /pet y obtener el ID de la respuesta.
2. Enviar una solicitud PUT a `https://petstore.swagger.io/v2/pet` con el siguiente cuerpo JSON, reemplazando `{idPetStore}` por el ID obtenido:

```json
{
  "id": {{idPetStore}},
  "name": "Pet Update",
  "photoUrls": [
    "pet_update.jpg"
  ]
}
```

3. Verificar que la respuesta tenga un código de estado 200.
4. Verificar que la mascota se haya actualizado correctamente  realizando una solicitud GET /pet/{petId} y comprobando que el nombre sea "Pet Update" y que contenga la url del campo "photoUrls".

**Resultado Esperado:**

- Código de estado: 200
- La mascota se actualiza correctamente y los nuevos datos pueden ser recuperados con GET /pet/{petId}.

#### Caso Negativo: Intentar actualizar una mascota con un ID que no existe

**Descripción:** Se intenta actualizar una mascota usando un ID que no existe en la base de datos.

**Pasos:**

1. Enviar una solicitud PUT a `https://petstore.swagger.io/v2/pet` con el siguiente cuerpo JSON, reemplazando `{idAleatorioInexistente}` con un ID inéxistente por ejemplo "8999844":

```json
{
  "id": {{idAleatorioInexistente}},
  "name": "Pet inexistente",
  "photoUrls": ["inexistente.jpg"]
}
```

2. Verificar que la respuesta tenga un código de estado 404 (Pet not found).

**Resultado Esperado:**

- Código de estado: 404 (Pet not found).

### 4. GET /pet/{petId}

#### Caso Positivo: Obtener los detalles de una mascota existente

**Descripción:** Se obtienen los detalles de una mascota usando un ID válido.

**Pasos:**

1. Primero, agregar una nueva mascota usando POST /pet y obtener el ID de la respuesta.
2. Enviar una solicitud GET a `https://petstore.swagger.io/v2/pet/{petId}`, reemplazando `{petId}` con el ID obtenido.
3. Verificar que la respuesta tenga un código de estado 200 y que los datos de la mascota sean correctos.

**Resultado Esperado:**

- Código de estado: 200.
- Los datos de la mascota se devuelven correctamente.

#### Caso Negativo: Intentar obtener una mascota con un ID inexistente

**Descripción:** Se intenta obtener una mascota usando un ID que no existe.

**Pasos:**

1. Enviar una solicitud GET a `https://petstore.swagger.io/v2/pet/99999985`, asumiendo que 99999985 no es un ID válido.
2. Verificar que la respuesta tenga un código de estado 404 (Not Found).

**Resultado Esperado:**

- Código de estado: 404 (Not Found).
- El response contiene el mensaje de error.

#### Caso Negativo: Intentar obtener una mascota con un ID con formato inválido

**Descripción:** Se intenta obtener una mascota usando un ID compuesto por letras.

**Pasos:**

1. Enviar una solicitud GET a `https://petstore.swagger.io/v2/pet/aaaaaaaa`.
2. Verificar que la respuesta tenga un código de estado 404 (Not Found).

**Resultado Esperado:**

- Código de estado: 404 (Not Found)
- El response contiene el mensaje de error.

### 5. POST /pet/{petId}

#### Caso Positivo: Modificar una mascota existente

**Descripción:** Se modifica una mascota usando datos válidos.

**Pasos:**

1. Primero, agregar una nueva mascota usando POST /pet y obtener el ID de la respuesta.
2. Enviar una solicitud POST a `https://petstore.swagger.io/v2/pet/{idPet}`, reemplazando `{idPet}` con el ID obtenido. Los datos x-www-form-urlencoded a completar son:
```
name: Grillo
status: pending
```
3. Verificar que la respuesta tenga un código de estado 200.
4. Intentar obtener la mascota con GET /pet/{idPet} y verificar la mascota con los datos modificados.

**Resultado Esperado:**

- Código de estado: 200 para la solicitud POST.
- El response contiene el mensaje con el ID modificado.
- La mascota se actualiza correctamente y los nuevos datos pueden ser recuperados con GET /pet/{petId}.

#### Caso Negativo: Intentar modificar una mascota con un ID que no existe

**Descripción:** Se intenta modificar una mascota usando un ID que no existe.

**Pasos:**

1. Enviar una solicitud POST a `https://petstore.swagger.io/v2/pet/100002225555`, asumiendo que 100002225555 es un ID inexistente. Los datos x-www-form-urlencoded a completar son:
```
name: Luciernaga
status: sold
```
2. Verificar que la respuesta tenga un código de estado 404 (Not Found).

**Resultado Esperado:**

- Código de estado: 404 (Not Found).
- Response con mensaje de error.

### 6. DELETE /pet/{petId}

#### Caso Positivo: Eliminar una mascota existente

**Descripción:** Se elimina una mascota usando un ID válido.

**Pasos:**

1. Primero, agregar una nueva mascota usando POST /pet y obtener el ID de la respuesta.
2. Enviar una solicitud DELETE a `https://petstore.swagger.io/v2/pet/{idPetEliminar}`, reemplazando `{idPetEliminar}` con el ID obtenido.
3. Verificar que la respuesta tenga un código de estado 200.
4. Intentar obtener la mascota con GET /pet/{idPetEliminar} y verificar que ya no existe (código 404).

**Resultado Esperado:**

- Código de estado: 200 para la solicitud DELETE.
- El response contiene el mensaje con el ID eliminado.
- Código de estado: 404 para la solicitud GET posterior.

#### Caso Negativo: Intentar eliminar una mascota con un ID que no existe

**Descripción:** Se intenta eliminar una mascota usando un ID que no existe.

**Pasos:**

1. Enviar una solicitud DELETE a `https://petstore.swagger.io/v2/pet/4578784545`, asumiendo que 4578784545 no es un ID válido.
2. Verificar que la respuesta tenga un código de estado 404 (Not Found).

**Resultado Esperado:**

- Código de estado: 404 (Not Found).
- Response vacío sin datos.