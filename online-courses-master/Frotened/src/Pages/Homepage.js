
import { coursedata12 } from "../data";
import "./Homepage.css"
import Sliders from "../Components/Slider";
import images from "../Images/Screenshot 2023-04-18 1344.png";
import image1 from "../Images/Screenshot 2023-04-18 141246.png";
import image4 from "../Images/Screenshot 2023-04-18 152728.png";
import {BsGraphUpArrow} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchcourses } from "../Redux/Slices/Coursesslice";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../Api";
function Homepage() {
const [data,setData] = useState([])
  const dispatch = useDispatch()
  const coursedata = useSelector((state) => state.courses.courses);
  console.log("courses",coursedata)
 useEffect(()=>{
  dispatch(fetchcourses())

 },[])






  return (
    <div>
<div className='container-fluid'>
  <div className='row align-items-center'>
    <div className='col-md-6 col-12'>
      <h1 style={{fontSize:"50px",marginTop:"0",fontWeight:"bold"}}>Start learning real time projects from experts</h1>
      <p style={{marginTop:"40px"}}>Study any topic, anytime. explore hundreds of real time projects for the lowest price ever!</p>
      <input type="text" placeholder='search your courses' className='w-100 display-block' style={{ padding: "15px 90px 15px 10px", borderRadius: "25px", backgroundColor: "#e6e6e6",border:"0"}} />
    </div>
    <div className='col-md-6 col-12'>
      <img src={images} className='image-containers' style={{maxWidth:"100%"}} />
    </div>
  </div>
</div>
<div className='container-fluid background-container'>
  <div className='row'>  
    <div className='col-md-4 d-flex justify-content-center'>
      <img src={image1} style={{height:"90px",width:"300px",borderRadius:"10px"}} />
    </div>
    <div className='col-md-4 d-flex justify-content-center'>
      <img src={image1} style={{height:"90px",width:"300px",borderRadius:"10px"}} />
    </div>
    <div className='col-md-4 d-flex justify-content-center'>
      <img src={image1} style={{height:"90px",width:"300px",borderRadius:"10px"}} />
    </div>
  </div>
</div>
<div style={{marginTop:'50px'}}>
<h1 style={{textAlign:'center',textDecoration:"underline",fontWeight:"bold"}}>Top Categories</h1>



<div className='container-fluid'>
  <div className="row">
    {coursedata12?.map(course => (
       <div className="col-md-3">
      <Link to={`/courses/${course.name}`} className='row' style={{textDecoration:"none"}}>
      <div className='containers' key={course.id}>
    
        <BsGraphUpArrow style={{marginTop:"30px", height:"50px", width:"50px", backgroundColor:'red', color:"white", borderRadius:"50%", padding:"16px"}} />
        <h5 style={{color:"black",textDecoration:"none"}}>{course.name}</h5> 
        <p style={{opacity:"0.5",color:"black",}}>25 courses</p>
        </div>
      
      </Link>
      </div>
    ))}

</div>
</div>

</div>

<div style={{marginTop:'50px'}}>
<h1 style={{textAlign:'center',textDecoration:"underline",marginBottom:"70PX"}}>Top Courses</h1>

</div>
<div>
<Sliders />
</div>

<div style={{marginTop:'50px'}}>
<h1 style={{textAlign:'center',textDecoration:"underline"}}>Explore Our Courses</h1>

</div>

<div style={{ display: "flex", justifyContent:"center"}}>
 {coursedata?.courses?.map(course =>
 <div>

  <Link to={`/course/${course._id}`} style={{textDecoration:"none"}}>
	<div class="product-card">
		<div class="badge">Hot</div>
		<div class="product-tumb">
			<img src={course.image} alt="" />
		</div>
		<div class="product-details">
			<span class="product-catagory">{course.level}</span>
      <h6 style={{color:"black"}}>{course.author}</h6>
      <div style={{height:"60px"}}>
			<h4 >{course.name}</h4>

  
 
      <div className='d-flex justify-content-start mt-0'>
            {[1, 2, 3, 4, 5].map((starIndex) => (
        <AiFillStar
          key={starIndex}
          style={{ color: "black", marginLeft: "5px" }}
         className={starIndex <= course.averagerating ? "star-fill" : "star-opacity"}
        />
      ))}
      </div>
      </div>
     <p >{course.description}</p>
   
  
			<div class="product-bottom-details">
				<div class="product-price"><small>$96.00</small>{course.price}</div>
				
			</div>
		</div>
    </div>
    </Link>
	</div>)}

  </div>
  <Link to='/explore-all-courses'>
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  <button class="cta">
    <span>Explore Courses</span>
   
    <svg viewBox="0 0 13 10" height="10px" width="15px">
      <path d="M1,5 L11,5"></path>
      <polyline points="8 1 12 5 8 9"></polyline>
    </svg>
  </button>
</div>
</Link>
<div style={{marginTop:'50px'}}>
<h1 style={{textAlign:'center',textDecoration:"underline"}}>Featured Instructor</h1>
</div>
<div className='featured-instructor'>
    <img src={image4} />
  </div>
  </div>
    
  );
}

export default Homepage;
