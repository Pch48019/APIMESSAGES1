
import { logger } from './logger.js';
import { getListOfMessages, addMessage, getMessageBykey, deleteMessageBykey } from './bl.js';
import {  Router as expressRouter } from 'express';
import { query, validationResult } from 'express-validator';

export const router = expressRouter();

router.get('/', async (req, res) => {
    try {
        let get_ = await getListOfMessages(req.query)
        console.log(get_);
        res.status(200).json({
            result:get_
        });
    
    }
    catch (err) {
        res.status(500).json({err: err.message});
        logger.error(err);
    }
})


    router.post('/',[
        query('fromName').exists(),
        query('toName').exists(),
        query('message').exists(),
        query('fromName').isLength({ max: 200}),
        query('toName').isLength({ max: 200}),
      ], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
    try {

        let post_ = await addMessage(req.query);
        console.log(post_);
        res.status(200).res.status(200).json({
            rowAffected: post_});
        }
    catch(err) {
        res.status(500).json({err: err.message});
        logger.error(err);
    }
})

router.get('/:key', async(req, res) => {
    try {
        let get_key = await getMessageBykey(req.params.key);
        console.log(get_key);
        res.status(200).json({
            result: get_key});
    }
    catch (err) {
        res.status(500).json({err: err.message});
        logger.error(err);
    }
})



router.delete('/:key', async (req, res) => {
    try {
        let deletemessage = await deleteMessageBykey(req.params.key);
        console.log(deletemessage);
        res.status(200).json({
           rowAffected: deletemessage});

    }
    catch (err) {
        res.status(500).json({err: err.message});
        logger.error(err)
    }
}); 