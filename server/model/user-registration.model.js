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


// write the model for the previous customer registration check API

export async function existing_customer_check(data){
    const email = data.email;
    const mobile = data.mobile;
// SQL query to check in database if the both email and mobile number is present
    const register_customer_check_query = `SELECT email , mobile FROM users WHERE email = ? &&  mobile = ? `;
    
    try{
  const register_customer_check = await new Promise((resolve,reject)=>{
    pool.query(register_customer_check_query,[email,mobile],(error,result,fields)=>{
        if(error){
                reject(error);
        }
        else{
            resolve(result);
        }
    })
  })
 return register_customer_check.length > 0;  
    }catch(error){
        throw new Error(error.message);
    }
}

// Write the model for the Login API

export async function customer_login(data){
 
}