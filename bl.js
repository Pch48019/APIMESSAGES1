import  {conn}  from './dal.js';
import crypto from 'crypto';
import { logger } from './logger.js';
import pkg from 'moment';



const  moment = pkg;

//get List Of Messages
export const getListOfMessages = async (query) => {

    let paramsArr = [query.fromName, query.toName, query.createdAt]
    let fieldsArr = ['FROM_NAME', 'TO_NAME', 'CREATED_AT'];

               
    fieldsArr.push('MESSAGE','UPDATE_AT');
    let index = fieldsArr.indexOf(query.order)
     if(index < 0){
        query.order = 'ID'
     }

    try { 
        let queryBuilder = conn('MESSAGES').select('KEY as key','FROM_NAME as fromName','TO_NAME as toName','MESSAGE as messages') // build the query by paramsc
        .where((builder) => {
         for (let i = 0; i < fieldsArr.length; i++) {
             if (paramsArr[i] != undefined){                  
                 builder.where(`${fieldsArr[i]}`, 'like', `${paramsArr[i]}`)
               }
         }
        }
 
        ).orderBy(query.order)
       return await queryBuilder;
    }
      catch (err) {
          logger.error({'The get faild': err });
          throw new Error('The get faild');
      }
};



//add one message
export const addMessage = async (body) => {
console.log(body);
    let key = crypto.randomBytes(2).toString('hex');
    let created = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");

    try {
        let result = await conn('MESSAGES').insert({
            FROM_NAME: body.fromName, 
            TO_NAME: body.toName,
            MESSAGE: body.message,
            CREATED_AT: created,
            UPDATED_AT: created,
            KEY: key});
            console.log(result);
        return result;
    }
    catch (err) {
        logger.error({ 'The post faild': err });
        throw new Error('The post faild');
    }
}



//get Message By key
export const getMessageBykey = async (key) => {

    try {
        let result = await conn('MESSAGES').where('KEY', key).select('KEY as key','FROM_NAME as fromName','TO_NAME as toName','MESSAGE as messages')
        return result;
    }
    catch(err){
        logger.error({'The get message by id faild': err });
        throw new Error('The get message by id faild');
    }
}


//delete Message By key
export const deleteMessageBykey = async (key) => {  
    try {
        let result = await conn('MESSAGES').where('KEY', key).del()
        return result;
    }
    catch (err) {
        logger.error({'The delete faild': err});
        throw new Error('The delete faild');

    }

}
