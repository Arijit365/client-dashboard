import { new_register,existing_customer_check} from "../model/user-registration.model.js";
import {genSaltSync,hashSync} from 'bcrypt'

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
        return res.status(201).json({
            success:1,
            errCode:201,
            message:"User registered successfully"
          });
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
