This is an Express.js project

## Getting Started

After downloading it locally, run this command to install the dependencies

```
npm i
```

## To run the development server

run this command to run the server locally

```
npm run dev
```

## Setting up prisma

run this command chronological order to set the prisma

Generate Prisma Client

```
 npx prisma generate
```

Set up the database

```
 npx prisma migrate dev
```

(Optional) Seed the database

```
npx prisma db seed
```

## Enviroment Variables

Create a .env file in the root directory. Use the following format as a reference:

```
# Format: [DBMS]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]

DATABASE_URL="postgresql://postgres:yourpassword@yourhost.com:5432/postgres"

# Optional: used by Prisma CLI for direct database access
DIRECT_URL="postgresql://postgres:yourpassword@yourhost.com:5432/postgres"

# Port for the Express.js server
PORT=1234

# Secret key for things like JWT signing
SECRET_KEY="your-secret-key"

SUPABASE_URL="yoururl.com"

SUPABASE_SECRET_KEY="your-supabase-secret-key"

```

## Important notes

# Deployment to vercel

DO NOT FORGET TO REBUILD IT LOCALLY THEN PUSH TO REPOSITORY

```
npm run build
```

## Deployed API endpoints

All endpoints are deployed at:
https://nutechtechtest.vercel.app

# Register

```
POST /register
```

# Login

```
POST /login
```

# Get Profile

```
GET /profile
```

# Update Profile

```
PUT /profile/update
```

# Update Profile Image

```
PUT /profile/image
```

# Get Services

```
GET /services
```

# Get Banner

```
GET /banner
```

# Get Balance

```
GET /balance
```

# Create Top Up

```
POST /topup
```

# Create Transaction

```
POST /transaction
```

# Get Transaction History

```
GET /transaction/history
```
