const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { token } = require('morgan');
secret="asdasdffghjkl"

const createJWT=async(payload)=>{
    var token=jwt.sign(payload,secret,{expiresIn:'1m'});
    return token
}

const authVerify= async(token)=>{
    try {
        
        var payload=jwt.verify(token,secret)
        console.log(payload)
        return true,payload
    } catch (error) {
        return false
    }
}
const hashing= async(value)=>{
    try{
        const salt= await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(value,salt);
        return hash
    }
    catch(error){
        return error;
    }
}

const hashcompare=async(value,hash)=>{
    try {
        return await bcrypt.compare(value,hash)
    } catch (error) {
       return error 
    }
}

const role= async(req,res,next)=>{
    switch(req.body.role){
        case 1: console.log("admin");
        next();
        break;
        case 2: console.log("student");
        next();
        break;
        default:
        console.log(role)    
        res.send({
            statuscode:400,
            message:"invalid role"
        })
       
    }
    
}
module.exports={hashing,hashcompare,role,createJWT,authVerify}