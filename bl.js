import { conn } from './dal.js';
import crypto from 'crypto';
import { logger } from './logger.js';
import pkg from 'moment';
import knex from 'knex'


const  moment = pkg;

export const getListOfMessages = async (query) => {

    let paramsArr = [query.fromName, query.toName, query.createdAt]
    let fieldsArr = ['FROM_NAME', 'TO_NAME', 'CREATED_AT'];

               
    fieldsArr.push('MESSAGE','UPDATE_AT');
    let index = fieldsArr.indexOf(query.order)
     if(index < 0){
         query.order = 'ID'
     }

    try { 
       let result =  await conn('MESSAGES')//
       .where((builder) => {
        for (let i = 0; i < 3; i++) {
            if (paramsArr[i] != undefined){                  
                builder.where(fieldsArr[i], paramsArr[i]) 
              }
        }
       }

       ).orderBy(query.order)
       return result; 
    }
      catch (err) {
          logger.error({'The get faild': err });
          res.status(500).json('The get faild')
          return 
      }
};



export const addMessage = async (query) => {

    let key = crypto.randomBytes(2).toString('hex');
    let created = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");
    let updated = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");

    try {
        let result = await conn('MESSAGES').insert({
            FROM_NAME: query.fromName, 
            TO_NAME: query.toName,
            MESSAGE: query.message,
            CREATED_AT: created,
            UPDATED_AT: updated,
            KEY: key});
        return result;
    }
    catch (err) {
        logger.error({ 'The post faild': err });
        res.status(500).json('The post faild');
        return; 
    }
}




export const getMessageBykey = async (key) => {

    try {
        let result = await conn('MESSAGES').where('KEY', key)
        return result;
    }
    catch(err){
        logger.error({'The get message by id faild': err });
        res.status(500).json( 'The get message by id faild');
        return;
    }
}



export const deleteMessageBykey = async (key) => {  
    try {
        let result = await conn('MESSAGES').where('KEY', key).del()
        return result;
    }
    catch (err) {
        logger.error({'The delete faild': err});
        res.status(500).json( 'The delete faild' );
        return;

    }

}
