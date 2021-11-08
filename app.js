import express from 'express';
import { logger } from './logger.js';
import { router } from './router.js';
import oracledb from 'oracledb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { init } from './dal.js';



dotenv.config();



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/messages', router);


app.all('*', (req, res) => {
    res.status(404).json({
        status: faild,
        payload: 'The page not found.'
    })
    res.end();
});

const startApi = async () => {
    try {
        try {
            await init(); 
        } catch (err) {
            logger.error(err.message);
            return;
        }
        //OracleClient();
        app.listen(process.env.PORT, () => {
            logger.info('Server running, Express is listening...', process.env.PORT);
        })
    } catch (err) {
        logger.error(err.message);

    }


}

// const OracleClient = () => {
//     try {
//         oracledb.initOracleClient({ libDir: process.env.LIBDIR });
//     }
//     catch (err) {
//         console.error('Whoops!');
//         console.error(err);
//         return;
//     }
// }

startApi();

