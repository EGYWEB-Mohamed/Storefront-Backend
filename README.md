# Storefront-Backend

FWD Storefront Backend Project For FWD Nanodegree
By : Mohamed Said

# Important Install

```
npm install

```

After installing packages You Should run this command blow in the project terminal

```
cp .env.example .env
```

Then fill `.env` with correct data like blow

```
PORT=3000 // DB Port
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

# Important Production Scripts

```
npm run build
npm run start
```

# Important Development Scripts

```
1. npm run test
2. npm run dev
3. npm run clean
4. npm run format
5. npm run lint
```

# Steps To Make it Work !

- Download Node.js From https://nodejs.org/en/download
- run `npm run build` it automatically will run convert from typescript to js File then run `node build/.` which will start the server at http://localhost:3000
- To Run Test You Can use `npm run test`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 