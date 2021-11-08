
import dotenv from 'dotenv';
import { logger } from './logger.js';
import knex from 'knex'
import _bookshelf from "bookshelf";

dotenv.config();


export let init = async() => { //check if the connection success
  try {
    await conn.raw('SELECT * FROM MESSAGES')
  } catch (err) {
    logger.error({ 'The connection faild': err });
    throw new Error('The connection faild');
  }
};

export let conn = //connection to db
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






