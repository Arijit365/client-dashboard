const pool = require('../config/db.config');

const new_register = (data,callback)=>{
      const name = data.name;
      const email = data.email;
      const mobile = data.mobile;
      const password = data.password;

      // Insert query for the new user register
      const register_new_user_query = `INSERT INTO users (name,mobile,email,password) VALUES(?,?,?,?)`;

      pool.query(register_new_user_query, [name,mobile,email,password],(error,results,fields)=>{
    if(error) {
        callback(error);
    }else{
        callback(null,results);
    }
})
}

const customer_exist = (data,callback) =>{
    const email = data.email;
    const mobile = data.mobile;

    // search query for the new customer 
    const previous_member_search_query = `SELECT email , mobile FROM test.users WHERE mobile = ? || email = ? `;

    pool.query(previous_member_search_query, [email,mobile], (error,results,fields) =>{
        if(error){
            callback(error);
        }else{
            callback(null,results);
        }
    })
}

module.exports = {
    new_register
}