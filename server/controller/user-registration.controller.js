import { new_register,existing_customer_check , customer_login} from "../model/user-registration.model.js";
import {genSaltSync,hashSync, compare}  from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config({path:'../config/.env'})
import {transporter} from '../config/mail.js'

 export async function new_register_controller(req,res){
  
    // create function for password validation
    function checkPassword(password){
        let password_size = password.length;
        let checkLowerCase = /^(?=.*[a-z])/;
        let checkUppercase  = /^(?=.*[A-Z])/;
        let checkDigit = /^(?=.*\d)/;
        let checkSpecialCharactars = /^(?=.*[@$!%*?&])/;

        if(password_size<8){
          return "The length of the password would be greater than 8";
        }
        else if(!checkLowerCase.test(password)){
             return "Password must have atleast one lowercase chracter";
        }
        else if(!checkUppercase.test(password)){
            return "Password must have atleast one lowercase chracter";
        }
        else if(!checkDigit.test(password)){
            return "Password must contain atleast one digit";
        }
        else if(!checkSpecialCharactars.test(password)){
          return "Password must contain atleast one special character";
        }
        
    }

    // Write a function to send a mail when user resgister successfull
   async  function SendSuccessmail(email,name) {
      return await new Promise((resolve, reject) => {
        
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "User Registration Successful",
                text: `Your account has been created successfully ${name}.`
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    reject(error);
                } else {
                    console.log("Email Sent:", info.response);
                    resolve(info.response);
                }
            });
        });
    }
    
//          const mailOptions = {
//             from:process.env.EMAIL,
//             to:email,
//             subject:"User Registration successful",
//             text:"Your account is created is successful",
//          }
// transporter.sendMail(mailOptions,(error,info)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log("Email Sent", +info.response)
//     }
// })
 {
    }

       try {
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const password = req.body.password;

    let advanced_password = password;
    const salt = genSaltSync(10);
    advanced_password = hashSync(advanced_password,salt);
        

        if(!email){
            return res.status(422).json({
             success:0,
             errCode:422,
             message:"email is required"
            })
        };

        if(!mobile){
            return res.status(423).json({
                success:0,
                errCode:423,
                message:"mobile number is required"
            })
        };

        if(!password){
            return res.status(424).json({
                success:0,
                errCode:424,
                message:"Password is required"
            })
        };

          // validate the password and handling error using checkPassword function
        const checkPasswordError = checkPassword(password); 
     if(checkPasswordError){
        return res.status(400).json({
            success:2,
            errCode:401,
            message:checkPasswordError
        });

     };
    
        const results = await new_register({
            name,
            email,
            mobile,
            password,
            advanced_password
        });


    // check db updated or not
    if(!results || results.affectedRows === 0){
        return res.status(400).json({
            success:0,
            errCode:400,
            message:"Failed to register new user"
        });
    }
     
     // if the registration is successful
    
      if(results){
           res.status(201).json({
                        success:1,
                        errCode:201,
                        message:"User registered successfully"
                      });
// Run email function after the API response
// Use setImmediate function to sechedule without event loop
setImmediate(()=>{
    SendSuccessmail(email,name)
.then(()=>console.log("Success Email sent to email", email))
.catch(error=>console.error("Failed to sent email",error))
})
      }

    } catch (error) {
        return res.status(500).json({
            success:2,
            errCode:500,
            message:"Internal server error",
            error:error.message || "Unknown Error Occured"
            
        });
        
    }
}

// Write the logic for the existing customer check
export async function existing_customer_check_controller(req,res) {
    
    try{
const email = req.query.email; // Access the email query parameter from url
const mobile = req.query.mobile; // Access the mobile query parameter from url

if(!email && !mobile){
    return res.status(401).json({
        success:0,
        errCode:401,
        message:"Email and mobile are both field required"
    })
}

const check_existing = await existing_customer_check({email,mobile});

if(check_existing){
    // console.log(check_existing) 
    return res.status(201).json({
        success:1,
        errCode:201,
        message:"Customer exist"
    });
}
else{
  return res.status(404).json({
    success:0,
    errCode:404,
    message:"Customer not found"
  })
}
//catch error
    }catch(error){
        return res.status(500).json({
           success:2,
           errCode:500,
           message: "Internal server error",
           error:error.message || "Unknown error occured"
        });
    }
}

// Write the logic for the controller of the customer login API
export async function login_user_controller(req,res) {
     const email = req.body.email;
     const password = req.body.password;
    
     try{
     if(!email || !password){
        return res.status(401).json({
            success:0,
            errCode:401,
            message:"Email and password field can not be blank"
        })
    }

     const customer_login_check = await customer_login({email});
// If the email and password is not there
     if(!customer_login_check){
        return res.status(404).json({
         success:0,
         errCode:404,
         message:"Customer not found"
        });
    }

    // Password 
    const match_password = await compare(password, customer_login_check.advanced_password);

    if(!match_password){
        return res.status(401).json({
            success:1,
            errCode:401,
            message:"Incorrect password, please provide the correct password"
        })
    }
    
// If the customer email and password is matched
        return res.status(201).json({
            success:1,
            errCode:201,
            message:"customer is logged in successfully"
        });
    

     }catch(error){
        return res.status(500).json({
            success:2,
            errCode:500,
            message:"Internal server error",
            errorMessage: error.message || "An unexpected error is happen"
        })
     }
}
