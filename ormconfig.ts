// this file is used by typeorm to generate migrations
// https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#installing-cli

import { SnakeNamingStrategy } from "typeorm-naming-strategies"

// not needed to run api
const config = process.env.DATABASE_URL ? {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false
  },
  entities: [
    'dist/src/**/*.entity.js'
  ],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false
  } : {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // where to find the entities to make migrations
  entities: [
    __dirname + '/src/**/*.entity.ts'
  ],
  // where to find migrations to run them
  migrations:[
    'src/database/migrations/*.ts'
  ],
  // where to put migrations when they are created
  cli:{
    migrationsDir: 'src/database/migrations'
  },
  // tell migrations to use naming strategy for db
  // naming conventions
  namingStrategy: new SnakeNamingStrategy()
}

export default config
