import { run } from './dal.js';
import crypto from 'crypto';
import { logger } from './logger.js';
import pkg from 'moment';


const  moment = pkg;

export const getListOfMessages = async (query) => {

    let sql =  'SELECT * FROM MESSAGES';
    // concat the params from client
    let paramsArr = [query.fromName, query.toName, query.createdAt]
    let fieldsArr = ['From_name', 'To_Name', 'Created_at'];
    let fieldsParamsArr = ['fromName', 'toName', 'createdAt'];
    let bindVars = {}
    if (!paramsArr.every((val, i, arr) => val === arr[0])) {
        sql += ' where'
        let ifAnd
        for (let i = 0; i < 3; i++) {
            if (paramsArr[i] != undefined) {
                if (ifAnd) {
                    sql += ' AND';
                    ifAnd = false;
                }
                sql += ` ${fieldsArr[i]} LIKE :${fieldsParamsArr[i]}`
                bindVars[fieldsParamsArr[i]] = paramsArr[i];
                ifAnd = true;
            }
        }
    }
               
    fieldsArr.push('Message','Updated_at');
    let index = fieldsArr.indexOf(query.order)
     if(index < 0){
         query.order = 'Id'
     }
    sql += ` ORDER BY ${query.order}`;

    try {
       let result = await run(sql,bindVars);
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
    const sql = 'INSERT INTO MESSAGES(Key,From_name,To_name,Message,Created_at,Updated_at)VALUES(:key, :fromName, :toName, :message, :created, :updated)';
    let bindVars = {key: key, fromName: query.fromName, toName: query.toName, message: query.message, created: created, updated: updated }
    
    try {
        let result = await run(sql, bindVars);
        return result;
    }
    catch (err) {
        logger.error({ 'The post faild': err });
        res.status(500).json('The post faild');
        return; 
    }
}




export const getMessageBykey = async (key) => {

    const sql = 'SELECT * FROM MESSAGES WHERE Key = :key';
    const bindVars = {key: key}
    
    try {
        let result = await run(sql, bindVars);
        return result;
    }
    catch (err) {
        logger.error({'The get message by id faild': err });
        res.status(500).json( 'The get message by id faild');
        return;
    }
}



export const deleteMessageBykey = async (key) => {
    const sql = 'DELETE FROM MESSAGES WHERE Key = :key';
    const bindVars = {key: key}
    
    try {
        let result = await run(sql, bindVars);
        return result;
    }
    catch (err) {
        logger.error({'The delete faild': err});
        res.status(500).json( 'The delete faild' );
        return;

    }

}
