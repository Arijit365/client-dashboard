dotenv.config({path:'./config/.env'});

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRegistrationRoutes from "../server/routes/user-registration.routes.js";

const app = express();

const PORT = process.env.PORT || 6001;

//parse application // x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//parse application json
app.use(bodyParser.json());
// cross-origin 
app.use(cors({origin:"*"}));

// api route setup for the new user register api
app.use("/api/v1/user",userRegistrationRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is started on http://localhost:${PORT}`);
})
