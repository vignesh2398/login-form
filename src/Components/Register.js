import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './App.css';
import Spin from './Spin';



let url='https://loginform124.herokuapp.com/users/register'
export const Register = () => {
    const [formvalue,setvalue]= useState({email:"",Name:"",Mobile:"",password:""})
    const [message,setmessgae]=useState(false)
    const [loading,setloading]=useState(false)
    let navigate = useNavigate();
const handlechange=(e)=>{
    const { name, value } = e.target;
    setvalue({...formvalue,[name]:value})
    
}
 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setloading(true)
        let res=await axios.post(url,formvalue)
        if(res.data.statusCode===200)
        {
            setmessgae(false)
            setloading(false)
            navigate('/login')
        }
        else{
            setmessgae(true)
            setloading(false)
            console.log("user already exist")
        }
        console.log(formvalue)

    }

  return (
   <>
   <form className="container col-6" onSubmit={handleSubmit} >
  <div className="form-group ">
    <label htmlfor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={formvalue.email} onChange={handlechange} placeholder="Enter email"/>
  
  </div>
  
  <div className="form-group">
    <label htmlfor="exampleInputPassword1">Name</label>
    <input type="text" className="form-control" name='Name' value={formvalue.name} onChange={handlechange} id="exampleInputName" placeholder="Name"/>
  </div>

  <div className="form-group">
    <label htmlfor="exampleInputPassword1">Mobile</label>
    <input type="text" className="form-control" id="exampleInputMobile" name='Mobile' value={formvalue.Mobile} onChange={handlechange} placeholder="Mobile"/>
  </div>

  <div className="form-group">
    <label htmlfor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formvalue.password} onChange={handlechange} placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <div className='my-3'>{message?<span>user exist</span>:<></>}</div>
  <div className='my-3'>{loading?<Spin/>:<></>}</div>
</form>
   </>
  )
}


