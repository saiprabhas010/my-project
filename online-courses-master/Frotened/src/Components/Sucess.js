import React from 'react'
import { TiTick } from 'react-icons/ti';

import { useNavigate } from 'react-router-dom';
function Sucess() {
 const navigate = useNavigate()  
 const Navigatetohome =() =>{
  navigate('/')
 }
  return (
    <div >
 <div class="container" >
   <div class="row">
      <div class="col-md-6 mx-auto mt-5">
         <div style={{border:"5px solid #f2f2f2",height:"280px",borderRadius:"20px",background:"#fff"}} >
   <div style={{background:"rgba(255,102,0,1)",padding:"20px",borderRadius:"20px 20px 0px 0px"}}>
               <div  style={{margin:"0px auto",width:"50px",height:"50px",borderRadius:"100%",background:"#fff",textAlign:"center"}}>
                <TiTick style={{fontSize:"50px",color:'green'}}/></div>
            </div>
            <div  style={{textAlign:"center"}}>
               <h1>Payment Success !</h1>
               <p>Your payment has been successfully processed
      You now have access to the courses
     Enjoy learning and have a great time!. </p>
               <button type="button" class="btn" style={{backgroundColor:"rgba(255,102,0,1)",color:"white",borderRadius:"20px"}} onClick={Navigatetohome}>Go To Home</button>
            </div>
            
         </div>
      </div>
   </div>
</div>
</div>
  )
}

export default Sucess
