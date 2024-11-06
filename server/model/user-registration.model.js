import pool from '../config/db.config.js';


export async function new_register(data){
    const name = data.name;
    const email = data.email;
    const mobile = data.mobile;
    const password = data.password;
    const advanced_password = data.advanced_password
    
    // Insert query for the new user register
    const register_new_user_query = `INSERT INTO users (name,email,mobile,password,advanced_password) VALUES(?,?,?,?,?)`;

    try{
       // Handling and write a logic for handling db query operations for regestaring new user
       const result = await new Promise((resolve,reject)=>{
        pool.query(register_new_user_query,[name,email,mobile,password,advanced_password],(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });
       });
       
       return result;
    }
    catch(error){
        throw new Error(error.message);
    }
}




