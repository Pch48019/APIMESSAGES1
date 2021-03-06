
import { logger } from './logger.js';
import { getListOfMessages, addMessage, getMessageBykey, deleteMessageBykey } from './bl.js';
import {  Router as expressRouter } from 'express';
import { query, validationResult } from 'express-validator';

export const router = expressRouter();

router.get('/', async (req, res) => {
    try {
        let get_ = await getListOfMessages(req.query)
        console.log(get_.rows);
        res.status(200).send(get_.rows);
    }
    catch (err) {
        res.status(500).send(err.message);
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
        res.status(200).send(post_);
    }
    catch(err) {
        res.status(500).send(err.message);
        logger.error(err);
    }
})

router.get('/:key', async(req, res) => {
    try {
        let get_key = await getMessageBykey(req.params.key);
        console.log(get_key.rows[0]);
        res.status(200).send(get_key.rows[0]);
    }
    catch (err) {
        res.status(500).send(err.message);
        logger.error(err);
    }
})



router.delete('/:key', async (req, res) => {
    try {
        let deletemessage = await deleteMessageBykey(req.params.key);
        console.log(deletemessage);
        res.status(200).send(deletemessage);

    }
    catch (err) {
        res.status(500).send(err.message);
        logger.error(err)
    }
}); 