import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spin from './Spin'
var url='https://loginform124.herokuapp.com/users/login'
const Login = () => {
    const[loginvalue,setlogin]=useState({"email":"","password":""})
    const [message,setmessgae]=useState(false)
    const [loading,setloading]=useState(false)
    let navigate = useNavigate();
    const handlechange=(e)=>{
        const { name, value } = e.target;
        setlogin({...loginvalue,[name]:value})

    }
    const handlesumbit=async(e)=>{
        e.preventDefault();
        setloading(true)
        let res=await axios.post(url,loginvalue)
        if(res.data.statusCode===200)
        {
            setmessgae(false)
            setloading(false)
            sessionStorage.setItem('token',res.data.token)
            navigate('/dashboard')
        }
        else{
            setmessgae(true)
            setloading(false)
            console.log("user already exist")
        }
        console.log(loginvalue)

    }
  return (
    <><form className="container col-6" onSubmit={handlesumbit}>
    <div className="form-group ">
      <label hrmlfor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      value={loginvalue.email} onChange={handlechange} name="email" placeholder="Enter email"/>

    </div>
    <div className="form-group">
      <label htmlfor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={loginvalue.password} onChange={handlechange} 
        placeholder="password"/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    <div className='my-3'>{message?<span>incorrect details</span>:<></>}</div>
  <div className='my-3'>{loading?<Spin/>:<></>}</div>
  </form></>
  )
}

export default Login