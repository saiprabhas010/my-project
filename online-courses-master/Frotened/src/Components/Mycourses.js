import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { API } from '../Api'
import {Link,useLocation} from "react-router-dom"
function Mycourses() {
 
  const [postedcourses,setPostedcourses] = useState(null)
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  useEffect(()=>{
    if(userdata){
axios.get(API+`${userdata.existingUser._id}/posted-courses`).
then(res=>setPostedcourses(res.data))
    }
  },[])
 
  return (
    <div>
   <h6 style={{ marginTop: "20px", marginLeft: "30px" }}>Posted Courses</h6>
    {!postedcourses?.length == 0 ? postedcourses?.userpostedcourses?.map((course)=>(
      <Link to={`/${course._id}/update-course`} style={{textDecoration:"none"}}>
          <div class="container ">
              <div class="row">
    
                <div class="col-md-9 col-12">
      
                  <div className="card mb-5">
                    
                    <div className="row no-gutters">
                      <div className="col-md-3 ">
    
                        <img src={course.image} className="card-img" alt="..." />
                      </div>
                      <div className="col-md-7 col-9">
                        <div className="card-body">
                          <h5 className="card-title">{course.name}</h5>
                          <p className="card-text">{course.description}</p>
    
                        </div>
                      </div>
                      <div className="col-md-2 col-3">
                        <div className="card-body">
                          <p className="card-text"><b>${course.price}</b></p>
    
                        </div>
    
                      </div>
    
                    </div>
                  </div>
            
                </div>
                <div className='col-md-3'>
    
                 
                </div>
              </div>
            </div></Link>)):<h1 style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>No Courses You Posted</h1>}      
 
    
   
        </div>
  )
}

export default Mycourses
