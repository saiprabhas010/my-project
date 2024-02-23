import React, { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { TbMessageCircle2Filled } from 'react-icons/tb'
import { GoPlusSmall } from 'react-icons/go'
import { MdSlowMotionVideo } from 'react-icons/md'
import { IoIosContact } from 'react-icons/io'
import { AiFillStar } from 'react-icons/ai'
import { BsDot} from 'react-icons/bs'
import "../App.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { API } from '../Api';
import { toast } from 'react-toastify'
function Coursedetailpage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const [showMore, setShowMore] = useState(false);
  const [showcontents, setShowcontents] = useState(false);
 const [data, setData] = useState([])

  useEffect(() => {
    axios.get(API + `course/${id}`).then(res => setData(res.data))
  }, [])
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  function showcontent() {
    setShowcontents(!showcontents)
  }
  function Addtocart() {
    if (userdata) {
      axios.post(API + "add-courses-in-cart", {
        email: userdata.existingUser.email,
        course_id: id
      }, {
        headers: {
          'x-token': userdata.token,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log("data1234", res.data);
          toast.success(`${data.name} added to cart`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });})
        .catch(error => {
          toast.error(`${error.response.data}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        });
    } else {
      navigate("/login")
    }
  }
  
 return (
    <div>

      <div className='courses-heading' >
        <div className='courses-heading-text' >
          <h1 style={{ color: "white", paddingTop: "20px" }}>{data.name}</h1>
          <p className='text-white'>{data.description}</p>
          <div>
            <button className="arrow-button" style={{ textTransform: "capitalize" }}>{data.level}</button>
            <AiOutlineStar style={{ color: "white" }} />
            <AiOutlineStar style={{ color: "white" }} />
            <AiOutlineStar style={{ color: "white" }} />
            <AiOutlineStar style={{ color: "white" }} />
            <AiOutlineStar style={{ color: "white" }} /><span style={{ color: "white", marginRight: "15px" }}>0</span>
            <span style={{ color: "white", marginRight: "15px" }}>0(Ratings)</span>
            <span style={{ color: "white", marginRight: "15px" }}>878 students enrolled</span>
            <TbMessageCircle2Filled style={{ color: "white" }} />
            <span style={{ color: "white" }}>English</span>
          </div>
        </div>
        <div className="course-content-image" >
          <img src={data.image} alt="image" height="300px" width="300px" style={{ border: "10px solid  #2eb8b8", borderRadius: "15px" }} />
        </div>
      </div>
      <div className='display-course-content '>
        <div style={{ width: "95%", boxShadow: "2px 4px 8px 2px rgba(0, 0, 0, 0.15)", margin: "20px 0px 0px 20px", borderRadius: "10px", paddingRight: "20px" }}>

          <h4 style={{ marginBottom: "20px", textAlign: "center" }}>Course Overview</h4>
          <ol className='ol'>
            <li style={{ paddingBottom: "10px" }}>Understanding Problem Statement</li>
            <li style={{ paddingBottom: "10px" }}>Understanding different libraries and their respective uses</li>
            <li style={{ paddingBottom: "10px" }}> In depth exploratory data analysis of each feature.</li>
            <li style={{ paddingBottom: "10px" }}>Data cleansing and preparation.</li>
            <li style={{ paddingBottom: "10px" }}>Defining an approach to solve ML classification problems.</li>
            <li style={{ paddingBottom: "10px" }}>Data preparation for Machine Learning model.</li>
            <li style={{ paddingBottom: "10px" }}>Training and testing the model using cross validation</li>
            {showMore ? (
              <>
                <li style={{ paddingBottom: "10px" }}>Creating custom functions for machine learning models.</li>
                <li style={{ paddingBottom: "10px" }}>In depth explanation of data imputation and filling missing data.</li>
              </>
            ) : null}
            {!showMore && (

              <button onClick={toggleShowMore} style={{ backgroundColor: "white", color: "green", border: "none" }}>View more</button>

            )}
            {showMore && (

              <button onClick={toggleShowMore} style={{ backgroundColor: "white", color: "green", border: "none" }}>View less</button>

            )}


          </ol>
          <p style={{ fontSize: "24px", margin: "20px 20px 20px 20px" }}>What will i learn?</p>
          <p style={{ margin: "20px 20px 20px 20px", border: "2px solid rgba(0, 0, 0, 0.5)", borderRadius: "5px" }}>Learn to create Machine Learning<br /> Algorithms in Python</p>
          <h5 style={{ marginLeft: "20px" }}>Requirements</h5>
          <p style={{ marginLeft: "40px", marginBottom: "20px" }}>Basic Programming Knowledge</p>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px" }}>
            <h5 style={{ marginLeft: "5px", fontSize: "20px" }}>Curriculum for this course</h5>
            <span>{data?.videos?.length}lessons</span>
            <span>{data.time}</span>
          </div>
          {data?.videos?.map((videos) => (
            <div>

              <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid rgba(0, 0, 0, 0.5)", margin: "0px 10px 0px 10px", borderRadius: "10px" }}>
                <div style={{ display: "flex" }}>
                  {!showcontents ? <GoPlusSmall style={{ margin: "auto", height: "20px", fontSize: "24px" }} onClick={showcontent} /> :
                    <AiOutlineMinus style={{ margin: "auto", height: "20px", fontSize: "24px" }} onClick={showcontent} />}<h6>Introduction</h6>
                </div>
                <span>5 lessons</span>
                <span>00:13:30 Hours</span>
              </div>
              {showcontents && <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid rgba(0, 0, 0, 0.5)", margin: "0px 10px 0px 10px", borderRadius: "10px" }}>
                <><div style={{ display: "flex" }}>
                  <MdSlowMotionVideo style={{ margin: "auto", height: "20px", fontSize: "24px" }} />
                  <p style={{ fontSize: "13px", textAlign: "center", marginTop: "10px", fontWeight: "bold" }} className='text-primary'>{videos.topic.name}</p>
                </div>
                  <a style={{ fontWeight: "bold", marginTop: "8px" }} className='text-primary'
                    href={videos.topic.url} target='_blank'>preview</a>
                  <span style={{ marginTop: "10px", float: "right" }}>{videos.topic.time} Hours</span></>



              </div>}
            </div>))}


          <h5 style={{ margin: "40px 20px 20px 20px" }}>Other related courses</h5>
          <hr style={{ marginTop: "0px", height: "3px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px", borderRadius: "10px" }}>

            <h6 >00:21:42 Hours</h6>
            <div style={{ display: 'column', margin: "0px" }}>
              <p style={{ fontWeight: "bold" }}>Pancard Tempering Detection</p>
              <p style={{ opacity: "0.3", marginTop: "-15px" }}>Updated Fri, 18-Nov-2022</p>
            </div>
            <div style={{ display: "flex" }}>
              <AiOutlineStar style={{ color: "yellow", height: "25px" }} />0
            </div>
            <div style={{ display: "flex" }}>
              <IoIosContact style={{ height: "25px" }} />
              <span>878</span>
            </div>
            <h6>Rp 499</h6>
          </div>
          <hr style={{ marginTop: "0px", height: "3px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px", borderRadius: "10px" }}>

            <h6 >00:21:42 Hours</h6>
            <div style={{ display: 'column', margin: "0px" }}>
              <p style={{ fontWeight: "bold" }}>Pancard Tempering Detection</p>
              <p style={{ opacity: "0.3", marginTop: "-15px" }}>Updated Fri, 18-Nov-2022</p>
            </div>
            <div style={{ display: "flex" }}>
              <AiOutlineStar style={{ color: "yellow", height: "25px" }} />0
            </div>
            <div style={{ display: "flex" }}>
              <IoIosContact style={{ height: "25px" }} />
              <span>878</span>
            </div>
            <h6>Rp 499</h6>

          </div>
          <hr style={{ marginTop: "0px", height: "3px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px 0px 10px", borderRadius: "10px" }}>

            <h6 >00:21:42 Hours</h6>
            <div style={{ display: 'column', margin: "0px" }}>
              <p style={{ fontWeight: "bold" }}>Pancard Tempering Detection</p>
              <p style={{ opacity: "0.3", marginTop: "-15px" }}>Updated Fri, 18-Nov-2022</p>
            </div>
            <div style={{ display: "flex" }}>
              <AiOutlineStar style={{ color: "yellow", height: "25px" }} />0
            </div>
            <div style={{ display: "flex" }}>
              <IoIosContact style={{ height: "25px" }} />
              <span>878</span>
            </div>
            <h6>Rp 499</h6>
          </div>
          <hr style={{ marginTop: "0px", height: "3px" }} />
        </div>
        {/* THIS IS FOR DESKTOP DEVICES */}

        <div className='display-block' style={{ margin: "20px 50px 0px 250px", borderRadius: "15px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", width: "60%", position: "sticky", top: "20px", height: "100%" }}>
          <h2 style={{ textAlign: "center" }}>Rp {data.price}</h2>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", marginTop: "30px" }}>
            <button style={{ backgroundColor: "white", border: "1px solid red", padding: "10px 50px 10px 50px", borderRadius: "5px" }}>Add to Wishlist</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", marginTop: "30px" }}>
            <button style={{ backgroundColor: "white", border: "1px solid green", padding: "10px 60px 10px 60px", borderRadius: "5px" }} onClick={Addtocart}>Add to Cart</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", marginTop: "30px" }}>
            <button style={{ backgroundColor: "white", border: "1px solid #e6b800", padding: "10px 70px 10px 70px", borderRadius: "5px" }}>BuyNow</button>
          </div>
          <h3>Includes:</h3>
          <ol>
            <li>{data.time} Hours On demand videos</li>
            <li>{data.videos?.length} Lessons</li>
            <li>Access on mobile and tv</li>
            <li>Full lifetime access</li>
          </ol>
          <Link to="/comparecourses">
            <h6 style={{ textAlign: "center", backgroundColor: "yellow", margin: "0px 10px 10px 10px", borderRadius: '10px' }}>compare this course with other</h6>
          </Link>
        </div>
        {/* THIS IS FOR MOBILE DEVICES*/}
        <div className='display-none'>
          <div style={{ margin: "20px 10px 0px 10px", borderRadius: "15px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", width: "90%", position: "relative" }}>
            <h2 style={{ textAlign: "center" }}>Rp {data.price}</h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px", marginTop: "30px" }}>
              <button style={{ backgroundColor: "white", border: "1px solid red", padding: "10px 30px", borderRadius: "5px", marginBottom: "10px" }}>Add to Wishlist</button>
              <button style={{
                backgroundColor: "white",
                border: "1px solid green",
                padding: "10px 40px",
                borderRadius: "5px",
                marginBottom: "10px"
              }}
                onClick={() => console.log(data)}>Add to Cart</button>
              <button style={{ backgroundColor: "white", border: "1px solid #e6b800", padding: "10px 50px", borderRadius: "5px", marginBottom: "30px" }}>Buy Now</button>
            </div>
            <h3 style={{ textAlign: "center" }}>Includes:</h3>
            <ol style={{ textAlign: "center", }}>
              <li>{data.time} Hours On demand videos</li>
              <li>{data.videos?.length} Lessons</li>
              <li>Access on mobile and tv</li>
              <li>Full lifetime access</li>
            </ol>
            <Link to="/comparecourses">
              <h6 style={{ textAlign: "center", backgroundColor: "yellow", margin: "0px 10px 10px 10px", borderRadius: '10px' }}>Compare this course with others</h6>
            </Link>
          </div>
        </div>



      </div>
      <div className='d-flex' style={{marginLeft:"25px"}}>
       <AiFillStar style={{fontSize:"35px",marginRight:"5px",fill:"yellow"}}/>
      <h3 style={{fontWeight:"bold"}}>{(data.averagerating)?.toFixed(1)}<span style={{margin:"0 5px 0 10px"}}>Course Rating</span></h3><BsDot style={{fontSize:"40px",marginRight:"5px"}}/>
      <h3 style={{fontWeight:"bold"}}>{(data.ratings?.length)}<span style={{margin:"0 5px 0 10px"}}>Ratings</span></h3>
      </div>
   
      {data.ratings && data.ratings?.map((rating)=>{ return(
       <div style={{height:"300px",width:"600px",border:"1px solid red",margin:'10px'}}>
       <div>
    
          <div className='d-flex'>
            <h5 style={{
              margin: "30px 30px 0px 30px", fontWeight: "bold", fontSize: "30px", color: "whitesmoke",
              backgroundColor: "black", display: "inline", padding: "0px 15px 10px 15px", textAlign: 'center'
            }} class="rounded-circle">{(rating.postedBy).slice(0, 1)}</h5>

            <h1 style={{ marginTop: "15px" }}>{rating.postedBy}</h1>
          </div>
          <div className='d-flex' style={{ marginLeft: "100px" }}>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <AiFillStar
                key={starIndex}
                style={{ color: "black", marginLeft: "5px", fontSize: "20px" }}

                className={starIndex <= rating.rating ? "star-fill" : "star-opacity"} />
            ))}
          </div></div><p style={{ marginLeft: "80px",marginTop:"30px",wordBreak:"break-word",marginRight:'40px'}}>{rating.comment}</p></div>
  )}
    
     )}
      
    </div>
  )
}

export default Coursedetailpage
