import React,{useState} from 'react'

import image from "../Images/pic14.jpg"
import{IoIosContact} from "react-icons/io"
import { API } from '../Api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Signup() {
  const navigate = useNavigate()
const [firstname,setFirstname] = useState('')
const [lastname,setLastname] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const signupformsubmit =(event) =>{
  event.preventDefault();
axios.post(API+"signup", {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  })
  .then(response => {
  setEmail("")
  setFirstname("")
  setLastname("")
  setPassword("")
    navigate("/login")
  })
  .catch(error => {
    console.error(error);
   
  });  
}
  
  return (
 
    <div>

   <div style={{textAlign:"center",marginTop:"60px"}}>
   <h1>Sign Up</h1>
   <p>Signup and start learning</p>
   </div>
   <div style={{display:'flex',justifyContent:"space-between"}}>
    <img src={image} alt="" style={{height:"80vh",width:"40vw",marginLeft:"30px"}} />
    <div style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",marginRight:"40px"}}>
    <form onSubmit={signupformsubmit}> 
   <h5 style={{margin:"20px 60px 4px 20px"}}>FirstName:</h5>
   <div style={{border:"6px solid rgba(0 0 0 0.2)",borderRadius:"5px"}}>
   <div style={{position:"relative"}}>
  <input type="text" placeholder="FirstName" style={{width:"35vw",margin:"0px 60px 10px 20px",padding:'4px', paddingLeft: '40px'}}
   value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
  <span style={{position:"absolute",top:"45%",transform:"translateY(-50%)",left:"30px"}}>
    <IoIosContact style={{height: '30px', width: '20px', marginRight: '10px'}}/>
  </span>
</div>

</div>
<h5 style={{margin:"20px 60px 4px 20px"}}>LastName:</h5>
   <div style={{border:"6px solid rgba(0 0 0 0.2)",borderRadius:"5px"}}>
   <div style={{position:"relative"}}>
  <input type="text" placeholder="FirstName" style={{width:"35vw",margin:"0px 60px 10px 20px",padding:'4px', paddingLeft: '40px'}} 
  value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
  <span style={{position:"absolute",top:"45%",transform:"translateY(-50%)",left:"30px"}}>
    <IoIosContact style={{height: '30px', width: '20px', marginRight: '10px'}}/>
  </span>
</div>

</div>
<h5 style={{margin:"20px 60px 4px 20px"}}>Email:</h5>
   <div style={{border:"6px solid rgba(0 0 0 0.2)",borderRadius:"5px"}}>
   <div style={{position:"relative"}}>
  <input type="email" placeholder="FirstName" style={{width:"35vw",margin:"0px 60px 10px 20px",padding:'4px', paddingLeft: '40px'}} value={email}
  onChange={(e)=>setEmail(e.target.value)}/>
  <span style={{position:"absolute",top:"45%",transform:"translateY(-50%)",left:"30px"}}>
    <IoIosContact style={{height: '30px', width: '20px', marginRight: '10px'}}/>
  </span>
</div>

</div>
<h5 style={{margin:"20px 60px 4px 20px"}}>Password:</h5>
   <div style={{border:"6px solid rgba(0 0 0 0.2)",borderRadius:"5px"}}>
   <div style={{position:"relative"}}>
  <input type="password" placeholder="FirstName" style={{width:"35vw",margin:"0px 60px 10px 20px",padding:'4px', paddingLeft: '40px'}} 
  value={password} onChange={(e)=>setPassword(e.target.value)}/>
  <span style={{position:"absolute",top:"45%",transform:"translateY(-50%)",left:"30px"}}>
    <IoIosContact style={{height: '30px', width: '20px', marginRight: '10px'}}/>
  </span>
</div>

</div>

<button type="submit"  style={{width:"35vw",
margin:"30px 60px 10px 20px",
padding:'4px', 
paddingLeft: '40px',
borderRadius:"5px",
border:"none",fontWeight:"bolder"}} className='bg-danger text-white'>Sign Up</button>
</form>
<p style={{textAlign:"center"}}>Already have an account?<b><Link to="/login" style={{textDecoration:"none",color:"black"}}>Login</Link></b></p>
    </div>
   </div>
    </div>
  )
}

export default Signup
