
import { logger } from './logger.js';
import { getListOfMessages, addMessage, getMessageBykey, deleteMessageBykey } from './bl.js';
import { Router as expressRouter } from 'express';
import { body, /*query,*/ validationResult } from 'express-validator';

export const router = expressRouter();

router.get('/', async (req, res) => {
    try {
        let get_ = await getListOfMessages(req.query)
        console.log(get_);
        res.status(201).json({
            status: 'ok',
            payload: get_
        });

    }
    catch (err) {
        res.status(500).json({
            status: 'faild',
            err: err.message
        });
        logger.error(err);
    }
})


router.post('/', [
    body('fromName').exists(),  //validation
    body('toName').exists(),
    body('message').exists(),
    body('fromName').isLength({ max: 200 }),
    body('toName').isLength({ max: 200 }),
], async (req, res) => {
    

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'faild',
            err: errors.array()[0] });
    }
    try {
console.log(req.body);
        let post_ = await addMessage(req.body);
        console.log(post_);
        res.status(201).json({
            status: 'ok',
            payload: post_
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'faild',
            err: err.message
        });
        logger.error(err);
    }
})

router.get('/:key', async (req, res) => {
    try {
        let get_key = await getMessageBykey(req.params.key);
        if (get_key) {
            console.log(get_key);
            res.status(201).json({
                status: 'ok',
                payload: get_key[0]
            });
        }
        else {
            res.status(404).json({
                status: 'faild',
                payload: 'The page not found.'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'faild',
            err: err.message
        });
        logger.error(err);
    }
})



router.delete('/:key', async (req, res) => {
    try {
        let deletemessage = await deleteMessageBykey(req.params.key);
        console.log(deletemessage);
        if (deletemessage) {
            res.status(200).json({
                status: 'ok',
                payload: deletemessage
            });
        }
        else {
            res.status(404).json({
                status: 'faild',
                payload: 'The page not found.'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'faild',
            err: err.message
        });
        logger.error(err)
    }
});