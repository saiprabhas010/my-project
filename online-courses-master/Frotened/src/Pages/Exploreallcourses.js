import { useEffect,useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API } from '../Api'
import "./Exploreallcourses.css"
function Exploreallcourses() {
  const [data,setData] = useState([])
  const [paginationcontent,setPaginationcontent] = useState([])
  const pages = []
  useEffect(()=>{
axios.get(API+"all-courses").then(res=>setData(res.data))

  },[])
  for (let i=1;i<= Math.ceil(data.length/10);i++){
    pages.push(i)
  }
  function pagepercontent(e,id) {
    e.preventDefault();
const datacontent = data.slice(((id+1)*10)-10,(id+1)*10)
setPaginationcontent(datacontent)
console.log(paginationcontent)

  }
console.log(data)
  return (
    <div style={{marginTop:'20px'}}>

<div >

  {paginationcontent.length > 0 && paginationcontent.courses.map(course=>(
 <div style={{border:"1px solid black",marginLeft:"10px",width:"260px",height:"380px"}}>
 <Link to={`/course/${course._id}`} style={{textDecoration:"none",color:"black"}}> 
	<img src={course.image} alt='' style={{height:"150px",width:"250px",padding:"20px"}}/>

  <h3 style={{marginLeft:"10px",height:"70px"}}>{course.name}</h3>
  <p style={{marginLeft:"10px",height:"30px"}}>{course.description.slice(0,65)}..........</p>
  <p style={{marginLeft:"10px",opacity:"0.6",height:"10px"}}>{course.author ? course.author:"pavan"}</p>
  <p>This is for rating</p>
  <hr style={{height:"1px",color:"black"}}/>
  <b>${course.price}</b>
   </Link> 
	</div>
  ))}

{!paginationcontent.length > 0 && (
  <div className='display-block-courses'>
    <div className="row justify-content-between">
      {data?.courses?.map(course => (
        <div className="col-md-3" style={{ marginTop: "50px" }}>
          <div className="card-sl">
            <div className="card-image">
              <img src={course.image} style={{height:"110px",width:"100%"}}/>
            </div>
         
   
            <div className="card-heading">
     {course.name}
            </div>
            <div className="card-text">
              {course.author}
            </div>
            <div className="card-text">
             {course.description}
            </div>
            <div className="card-text">
              ${course.price}
            </div>
            <a href="#" className="card-button">Purchase</a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

  
<div className="d-flex flex-row justify-content-center">
      {pages.map((page,id)=>(
        <div key={page} style={{marginLeft:"15px",padding:"5px",border:"1px solid black"}}onClick={(e) => pagepercontent(e, id)}
        >
            {page}
        </div>
      ))}
    </div>
     </div>
  
    </div>
  )
}

export default Exploreallcourses
