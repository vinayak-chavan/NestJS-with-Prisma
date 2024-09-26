# NestJS Project with Prisma and PostgreSQL

This is a NestJS project using **Prisma** as the ORM and **PostgreSQL** as the database.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 16.x or above): [Download Node.js](https://nodejs.org/)
- **NPM** (comes with Node.js) or **Yarn** (optional): 
  - NPM version 7.x or above
  - Yarn version 1.x or above (optional)
- **PostgreSQL** (version 12.x or above): [Download PostgreSQL](https://www.postgresql.org/download/)
- **Prisma** CLI: [Install Prisma CLI](https://www.prisma.io/docs/getting-started)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/nestjs-prisma-project.git
cd nestjs-prisma-project
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file based on the example

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET=ThisIsSecret
PORT=3000
```

4. Run Prisma migrations to set up the database schema

```bash
npx prisma migrate dev --name init
```

5. Once everything is set up, run the application

```bash
npm run start
```

5. After the server is running, the Swagger documentation can be accessed at:

```bash
http://localhost:3000/api-docs
```