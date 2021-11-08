// this file is used by typeorm to generate migrations
// https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#installing-cli
// not needed to run api
const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    __dirname + '/src/**/*.entity.ts',
  ],
  migrations:[
    'src/database/migrations/*.ts'
  ],
  migrationsRun: true,
  cli:{
    migrationsDir: 'src/database/migrations'
  },
  synchronize: false,
}

export default config
