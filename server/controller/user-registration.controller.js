import { new_register } from "../model/user-registration.model";

const new_register_controller = async (req,res) =>{
  
    // create function for password validation
    function checkPassword(password){
        let password_size = password.length;
        let checkLowerCase = /^(?=.*[a-z])/;
        let checkUppercase  = /^(?=.*[A-Z])/;
        let checkDigit = /^(?=.*\d)/;
        let checkSpecialCharactars = /^(?=.*[@$!%*?&])/;

        if(password_size<8){
            console.log("The length of the password would be greater than 8");
        }
        else if(!password.search(checkLowerCase)){
            console.log("In the password , it must contains atleast one lowercase letter");
        }
        else if(!password.search(checkUppercase)){
            console.log("In the password , it must contain atleast one uppercase letter")
        }
        else if(!password.search(checkDigit)){
            console.log("In the password , it must contain atleast one digit");
        }
        else if(!password.search(checkSpecialCharactars)){
            console.log("In the password , it will must contain atleast one special character");
        }
    }

    try {
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const password = req.body.password;
    
        const results = await new_register({
            name,
            email,
            mobile,
            password
        });

    // check db updated or not
    if(!results || results.affectedRows === 0){
        return res.status(400).json({
            success:0,
            errCode:400,
            message:"Failed to register new user"
        });
        if(!email || !mobile || !password){
            return res.status(401).json({
                success:2,
                errCode:401,
                message:"All the fields are important"
            });

        }
    }
        
    } catch (error) {
        
    }
    
}