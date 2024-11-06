dotenv.config({path:"./config/.env"});

import {createConnection, createPool} from 'mysql2';
import dotenv from 'dotenv';

//connect with mysql database

 const pool = createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectionLimit:process.env.DB_CONNECTION_LIMIT
})

pool.getConnection((err,connection)=>{
    if(err){
    if(err.code === "PROTOCOL_CONNECTION_LOST")
        console.error("Database connection is lost");
    if(err.code === "ER_CON_COUNT_ERROR")
        console.error("Database has two many connections");
    if(err.code === "ECONNREFUSED")
        console.error("Database connection has been removed");
    }
    if(connection) connection.release();
});

export default pool;
