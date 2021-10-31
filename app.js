import express from 'express';
import { logger } from './logger.js';
import { router } from './router.js';
import oracledb from 'oracledb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/messages', router);


app.get('/', (req, res) => {
    res.json('This is home page.')
    res.end();
});

app.all('*', (req, res) => {
    res.json('The page not found.')
    res.end();
});

const startApi = async () => {
    try {
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
//         process.exit(1);
//     }
// }

startApi();

