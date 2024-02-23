import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {FaSearch} from "react-icons/fa"
import {FaVideo} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import { API } from '../Api'
import "../App.css"
import { useParams } from 'react-router-dom'

function Particularcourse() {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
const username = ((userdata?.existingUser.firstname)+(userdata?.existingUser.lastname))
const Id = userdata?.existingUser._id
    const {userId} = useParams();
    const [course,setCourse] = useState(null)
    const [videourl,setVideourl] = useState(null)
     const [rating, setRating] = useState(0);
const [comment,setComment] = useState('')
  const handleClick = (starIndex) => {
    setRating(starIndex);
    console.log(rating)
  };
useEffect(()=>{
axios.get(API+`course/${userId}`).then(res=>setCourse(res.data))
},[])
const sendcomments =async(e) =>{
 e.preventDefault()
const data = await axios.post(API+`add-rating/${course._id}`,{rating,postedBy:username,comment,user:Id}).
then(res=>{alert(res.data.message);setComment('');}).catch(error=>alert(error.message))
}
  return (
    <>
      
<div style={{display:"flex",justifyContent:"space-evenly",backgroundColor:'black',color:'white',}}>
<div>
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
alt="Company Logo" style={{height:'40px',width:"100px"}}
          />
</div>
<span style={{marginLeft:"30px",width:"60%",fontWeight:"bold",fontSize:"20px"}}>{!videourl?.name ? course?.name:videourl?.name}</span>
<div>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" 
data-bs-whatever="@mdo" style={{background:"none",border:"none"}}>Leave Ratings/Comments</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style={{color:"black"}}>Add Comments</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
   
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label" style={{color:"black"}}>Rating:</label>
            <div className='d-flex justify-content-center'>
            {[1, 2, 3, 4, 5].map((starIndex) => (
        <AiFillStar
          key={starIndex}
          style={{ color: "black", marginLeft: "5px", fontSize: "40px" }}
          onClick={() => handleClick(starIndex)}
          className={starIndex <= rating ? "star-fill" : "star-opacity"}
        />
      ))}
      </div>

          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label" style={{color:"black"}}>Comment:</label>
            <textarea class="form-control" id="message-text" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={sendcomments}>Send message</button>
      </div>
    </div>
  </div>
</div>

</div>
</div>
 <div>
  <video controls style={{height:"500px",width:"100%"}}  src={videourl?.url} />
 

</div>
<div style={{display:"flex",justifyContent:"center",marginBottom:"30px"}}>
<div>
<FaSearch />
</div>
<div>
<p className='margin-left'>Course Content</p>
</div>
<div>
<p className='margin-left'>Q&A</p>
</div>

<div>
<p className='margin-left'>REVIEWS</p>
</div>
</div>
<div>
<div style={{display: 'flex', justifyContent: 'center'}}>
  <div style={{display: 'flex', flexDirection: 'column', boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.5)', marginBottom: 30}} className='padding-container'>
    {course && course.videos.map((course)=>(
    <div style={{ width: 500, border: '1px solid red', marginBottom: 30, display:"flex",wordBreak:"break-word",padding:'15px'}}>
        
      <FaVideo style={{marginTop:"5px"}} />
      <p  style={{marginLeft: 10,textDecoration:"none",color:"black"}} onClick={(e)=>{e.preventDefault();
    setVideourl(course?.topic);}}>{course?.topic?.name}</p>
 
    </div>
    ))}
  </div>
</div>




</div>



    </>
  )
}

export default Particularcourse
