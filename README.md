# Storefront-Backend

FWD Storefront Backend Project For FWD Nanodegree
By : Mohamed Said

- [Getting Started](#Getting-Started)
  - [Install Packages](#Install-Packages)
  - [DB Configurations](#DB-Configurations)
  - [Run Production](#Running-the-application)
  - [Run Development](#Important-Development-Scripts)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Install Packages

You need the following modules and dependencies installed to run this project:

```bash
npm install         #To Install Packages
```

After installing packages You Should run this command blow in the project terminal

```bash
cp .env.example .env    #To Take Copy from .env.example
```

Then fill `.env` with correct data like blow

```
PORT=3000 // App Port

# DB
POSTGRES_HOST=127.0.0.1 // DB Host
POSTGRES_DB_NAME= .... // DB Name
POSTGRES_TEST_DB_NAME= .... // Test DB Name
POSTGRES_USERNAME= .... // DB Username
POSTGRES_PASSWORD= .... // DB Password

ConnectionType='dev'

# Hashing Env
BCRYPT_PASSWORD=add-random-password-here
SALT_ROUND=10

# JWT
TOKEN_SECRET=add-random-secret-here
```

### DB Configurations

We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER storeDB WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store;`
  - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c store`
    - `GRANT ALL PRIVILEGES ON DATABASE store TO storeDB;`
  - Grant for test database
    - `\c store_test`
    - `GRANT ALL PRIVILEGES ON DATABASE store_test TO storeDB;`

Next, you need to run the database migrations:

```bash
db-migrate up
```

## Running the application

```
npm run build
npm run start
```

## Important Development Scripts

```
1. npm run test
2. npm run dev
3. npm run clean
4. npm run format
5. npm run lint
```

# More Help in How to Install

- Download Node.js From https://nodejs.org/en/download
- run `npm run build` it automatically will run convert from typescript to js File then run `node build/.` which will start the server at http://localhost:3000
- To Run Test You Can use `npm run test`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.
