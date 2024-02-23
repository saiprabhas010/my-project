import React,{useState} from 'react'

import { API } from '../Api'
import axios from 'axios'
import image from "../Images/pic14.jpg"
import { Link, useNavigate } from 'react-router-dom'
import{IoIosContact} from "react-icons/io"
function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const loginformsubmit =(event) =>{
  event.preventDefault();
axios.post(API+"login", {
   email: email,
    password: password
  })
  .then(response => {
 localStorage.setItem("userdata",JSON.stringify(response.data))
  setEmail("")
   setPassword("")
    navigate("/")
  })
  .catch(error => {
    alert(error.response.data);
   
  });  
}
  
  return (
    <div>

   <div style={{textAlign:"center",marginTop:"60px"}}>
   <h1>Login</h1>
   <p>Provide Your login credentials</p>
   </div>
   <div className='container'>
    <div className='row'>
<div className='col-md-6 display-block'>
<img src={image} alt="" style={{height:"80vh",width:"40vw",marginLeft:"30px"}} className='display-block'/>
</div>
<div className='col-md-6 col-12'>

  <div style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", padding: "20px"}}>
  <form onSubmit={loginformsubmit}> 
     
        <input type="email" className="form-control" id="email" placeholder="Enter email"  value={email}
  onChange={(e)=>setEmail(e.target.value)} />

 

      
        <input type="password" class="form-control" id="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Link to="/forgotpassword">  <a href="#" style={{float:"right",textDecoration:"none"}}>Forgot Password?</a>
        </Link>
 
   
      <button type="submit"  style={{width:"90%",
margin:"30px 60px 10px 20px",
padding:'4px', 
paddingLeft: '40px',
borderRadius:"5px",
border:"none",fontWeight:"bolder"}} className='bg-danger text-white' >Login</button>

    </form>
    <p style={{textAlign:"center"}}>Don't have account?<b><Link to="/signup" style={{textDecoration:"none",color:"black"}}>Signup</Link></b></p>
  </div>
</div>

</div>



    
   </div>
    </div>
  )
}

export default Login
