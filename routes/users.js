var express = require('express');
var router = express.Router();
const { MongoClient, dbUrl,mongodb } = require('./dbConfig');
const{hashing, hashcompare,role,createJWT,authVerify}=require('./auth')

router.post('/register',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl); 
  try{
let db = await client.db('Auth');
let user = await db.collection('users').findOne({email:req.body.email})
if(user)
{
  res.send({
    statusCode:400,
    message:"user already exist"
})
}
else
{
  let hashedPassword=await hashing(req.body.password)
  req.body.password=hashedPassword
  let deatils=await db.collection('users').insertOne(req.body)
  res.send({
    statusCode:200,
    message:"new user created",
    deatil:hashedPassword   
  })

}

  }
catch(error)
{
console.log(error)
res.send({
  statusCode:500,
  message:"internal error",
  error
})

}
finally
{
  client.close();

}
})
// login 
router.post('/login',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl); 
  try{
let db = await client.db('Auth');
let user = await db.collection('users').findOne({email:req.body.email})
if(!user)
{
  res.send({
    statusCode:400,
    message:"user not found"
})
}
else
{
  // hashing password compare
  let compare=await hashcompare(req.body.password,user.password)
  console
  if(compare==true)
  {
    const token= await createJWT({email:req.body.email})
    
    res.send({
      statusCode:200,
      message:"login success",
      token
    })
  }
  else{
    res.send({
      statusCode:400,
      message:"incorrect password",
      password:user.password,
      inputpassword:req.body.password,
      

    })
  }


}

  }
catch(error)
{
console.log(error)
res.send({
  statusCode:500,
  message:"internal error",
  error
})

}
finally
{
  client.close();

}
})
router.get('/verify-token/:token',async(req,res)=>{
  try {
    const validity= await authVerify(req.params.token) 
    console.log(validity)
    if(validity)
    {
      res.send({
        statusCode:400,
        message:"valid",
        pay:validity
      })
    }
    else{
      res.send({
        statusCode:401,
        message:"timeout",
        pay:validity
      })
    }
  } catch (error) {
    
  }
})

module.exports = router;
