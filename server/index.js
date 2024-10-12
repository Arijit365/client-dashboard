dotenv.config({path:'../../config/.env'});

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

const PORT = process.env.PORT || 6001;

//parse application // x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
//parse application json
app.use(bodyParser.json());
// cross-origin 
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is started on http://localhost:${PORT}`);
})
