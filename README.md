## Descripción
API REST desarrollada por estudiantes de la Universidad Técnica de Ambato que permite realizar análsis, operaciones y consultas sobre un sistema enfocado en ventas. 

## Tecnologías
- Nest.js
- TypeScript
- PostgreSQL

## Requisitos
- Node.js 20.13.1
- Docker
- Yarn

## Instalación

1. Instalar las dependencias de la aplicación

```bash
$ yarn install
```
**Nota**: Si no se reconoce el comando `yarn`, instalarlo con el siguiente comando:
```bash
$ npm install -g yarn
```

2. Crear un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias. A continuación un ejemplo de las variables necesarias:

```bash
PORT="3000"

DB_USERNAME="admin"
DB_PASSWORD="admin"
DB_NAME="sales-force"
DB_HOST="localhost"
DB_PORT="5450"
DATABASE_URL="postgresql://admin:admin@localhost:5450/sales-force?schema=public"
```


3. Utilizar el siguiente comando para levantar la base de datos en un contenedor de Docker:

```bash
$ docker-compose up
```
**Nota**: Asegurarse de tener Docker instalado en el sistema.

4. Ejecutar las migraciones:

 Este comando creará las tablas necesarias en la base de datos y poblará la base de datos con datos de prueba.

```bash
$ yarn migration:run
```

5. Iniciar la aplicación en los diferentes modos:


```bash
# development 
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
