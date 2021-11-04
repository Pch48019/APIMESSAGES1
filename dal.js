
import dotenv from 'dotenv';
import { logger } from './logger.js';
import knex from 'knex'

dotenv.config();


export let conn =
knex({
  client: 'oracledb',
  connection: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECTIONSTRING,
    requestTimeout: 100
  },
  pool: { min: 0, max: 7 }
});



