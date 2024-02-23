import React from 'react'
import {FaFacebook} from 'react-icons/fa'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillTwitterCircle} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import Logo from "../Images/Logo.png"
function Footer() {
  return (
    <div className='container-fluid m-0 p-0'  style={{backgroundColor:"#000033"}}> 
    <div className='row'>
<div className='col-md-4 col-6'>
<div style={{
    flex: "1",
    boxShadow: "5px 5px 0px 0px",
    padding: "20px",
    borderRadius: "10px",
  
    color:"grey"
    
}}>
    <h3 style={{marginLeft:"40px",marginTop:"10px",color:"white",marginTop:"30px"}}>
        Study any Project, anytime. explore hundreds of Projects and courses for the lowest price ever!
    </h3>
    <FaFacebook  style={{color:"white",marginLeft:"40px",height:"30px"}} />
    <AiFillTwitterCircle  style={{color:"white",marginLeft:"10px",height:"30px"}} />
    <AiFillLinkedin style={{color:"white",marginLeft:"10px",height:"30px"}} />
</div>
</div>
<div className='col-md-3 col-6'>
<ul style={{color:"white",opacity:"0.8",listStyleType:"none"}}>
    <h5 style={{marginTop:"20px",textDecoration:"underline"}}>Top categories</h5>
<li style={{marginBottom:"10px"}}>Machine Learning Projects</li>
<li style={{marginBottom:"10px"}}>Deep Learning Projects</li>
<li style={{marginBottom:"10px"}}>NLP Projects</li>
<li style={{marginBottom:"10px"}}>Website Projects</li>
<li style={{marginBottom:"10px"}}>Computer Vision Projects</li>
<li style={{marginBottom:"10px"}}>DJango Web Projects</li>

</ul>
</div>
<div className='col-md-3 col-6'>
<ul style={{color:"white",opacity:"0.8",listStyleType:"none"}}>

<h5 style={{marginTop:"20px",textDecoration:"underline"}}>Useful Links</h5>
<li style={{marginBottom:"10px"}}>Blog</li>
<li style={{marginBottom:"10px"}}>All Courses</li>
<li style={{marginBottom:"10px"}}>Sign Up</li>
</ul>
</div>
<div className='col-md-2 col-6'>
<ul style={{color:"white",opacity:"0.8",listStyleType:"none"}}>
  <h5 style={{marginTop:"20px",textDecoration:"underline"}}>Help</h5>
<li style={{marginBottom:"10px"}}>About US</li>
<li style={{marginBottom:"10px"}}>Privacy Policy</li>
<li style={{marginBottom:"10px"}}>Terms and conditions</li>
<li style={{marginBottom:"10px"}}>Refund Policy</li>

</ul>
</div>
    </div>
    <hr style={{border: "none", height: "1px", backgroundColor: "white", margin: "20px 0"}} />
  <nav style={{ display: "flex", justifyContent: "space-between",marginBottom:"30px"}}>
  <img src={Logo} alt="logo" className='mb-5' style={{ width: "150px", margin: "30px 0px 0px 50px" }} />
  
    <div>
      <p className='text-white'>© 2022 projectbank, All rights reserved</p>
      <p className='text-white'>Copy right 2021 by project bank.in</p>
    </div>
    <div >
<button style={{border:"none",borderRadius:"5px",backgroundColor:"blue",marginRight:"20px",color:"white"}}>English</button>
    </div>
    </nav>
    </div>
  )
}

export default Footer







   {/* <div style={{marginTop:'50px', display: "flex", alignItems: "center"}}>
  <div style={{
    flex: "1",
    boxShadow: "5px 5px 0px 0px",
    padding: "20px",
    borderRadius: "10px",
  
    color:"grey"
    
}}>
    <h3 style={{marginLeft:"40px",marginTop:"10px",color:"white",marginTop:"30px"}}>
        Study any Project, anytime. explore hundreds of Projects and courses for the lowest price ever!
    </h3>
    <FaFacebook  style={{color:"white",marginLeft:"40px",height:"30px"}} />
    <AiFillTwitterCircle  style={{color:"white",marginLeft:"10px",height:"30px"}} />
    <AiFillLinkedin style={{color:"white",marginLeft:"10px",height:"30px"}} />
</div>

  <div style={{flex: "1",marginLeft:"30px"}}>
    <ul style={{color:"white",opacity:"0.8",listStyleType:"none"}}>
    <h5 style={{marginTop:"20px"}}>Top categories</h5>
<li style={{marginBottom:"10px"}}>Machine Learning Projects</li>
<li style={{marginBottom:"10px"}}>Deep Learning Projects</li>
<li style={{marginBottom:"10px"}}>NLP Projects</li>
<li style={{marginBottom:"10px"}}>Website Projects</li>
<li style={{marginBottom:"10px"}}>Computer Vision Projects</li>
<li style={{marginBottom:"10px"}}>DJango Web Projects</li>

</ul>
  </div>
  <div style={{flex: "1"}}>
    <ul style={{color:"white",opacity:"0.8",listStyleType:"none"}}>

<h5 style={{marginTop:"20px"}}>Useful Links</h5>
<li style={{marginBottom:"10px"}}>Blog</li>
<li style={{marginBottom:"10px"}}>All Courses</li>
<li style={{marginBottom:"10px"}}>Sign Up</li>
</ul>
  </div>
  <div style={{flex: "1"}}>
    <ul style={{color:"white",opacity:"0.8",listStyleType:"none"}}>
  <h5 style={{marginTop:"20px"}}>Help</h5>
<li style={{marginBottom:"10px"}}>About US</li>
<li style={{marginBottom:"10px"}}>Privacy Policy</li>
<li style={{marginBottom:"10px"}}>Terms and conditions</li>
<li style={{marginBottom:"10px"}}>Refund Policy</li>

</ul>
  </div>
  </div>
  <hr style={{border: "none", height: "1px", backgroundColor: "white", margin: "20px 0"}} />
  <nav style={{ display: "flex", justifyContent: "space-between",marginBottom:"30px"}}>
  <img src={Logo} alt="logo" className='col-md-3' style={{ width: "150px", margin: "30px 0px 0px 50px" }} />
  
    <div>
      <p className='text-white'>© 2022 projectbank, All rights reserved</p>
      <p className='text-white'>Copy right 2021 by project bank.in</p>
    </div>
    <div>
<button style={{border:"none",borderRadius:"5px",backgroundColor:"blue",marginRight:"20px",color:"white"}}>English</button>
    </div>
</nav> */}