import oracledb from 'oracledb';
import dotenv from 'dotenv';
import { logger } from './logger.js';


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
dotenv.config();

await oracledb.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectionString: process.env.CONNECTIONSTRING,
  poolAlias: 'user' 
});

const connection = await oracledb.getConnection('user');

export const run = async (sql, bindVars) => {//
  try{
    console.log(typeof bindVars); 
    console.log(sql,bindVars);
    const result = await connection.execute(sql,bindVars,{ outFormat: oracledb.OBJECT, autoCommit: true });
    return result;
  }
  catch(err){
    logger.error(err.status);
    return err.status
  }
}

