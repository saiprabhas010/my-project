import React, { useState,useEffect } from 'react'
import { courseslist } from '../data'
import { AiFillStar } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { TfiViewListAlt } from 'react-icons/tfi'
import image from "../Images/Screenshot 2023-04-19 113055.png"
import { MdSlowMotionVideo } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { MdSubtitles } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API } from '../Api'

function Coursesclassification() {
    const {category} = useParams()
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedCourses, setSelectedCourses] = useState(null)
    const stars = [...Array(5)];  //it defines 5times undefined 
    const [price, setPrice] = useState(null)
    const [rating, setRating] = useState(null)
    const [language, setLanguage] = useState(null)
    const [level, setLevel] = useState(null)
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value)
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }
    const handleLevelChange = (event) => {
        setLevel(event.target.value)
    }
    const handleRatingChange = (event) => {
        setRating(event.target.value)
    }
   
    useEffect(() => {
        axios.get(API + `courses/${category}`)
          .then((response) => 
            setSelectedCourses(response.data)
          )
          .catch((error) => {
            console.log(error);
          });
          
      }, [category]);
    useEffect(()=>{
        fetchData()
    },[selectedCourse,price,level,rating])
console.log("category",category)
console.log("selectedcourse",selectedCourses)
     

      const fetchData = () => {
        const filters = {
          averagerating: rating,
          price: price,
          category: selectedCourse,
          level: level
        };
      
        const queryParams = new URLSearchParams();
        if (filters.averagerating) {
          queryParams.append('averagerating', filters.averagerating);
        }
        if (filters.price) {
          queryParams.append('price', filters.price);
        }
        if (filters.category && filters.category !== 'null') {
          queryParams.append('category', filters.category);
    }else {
         queryParams.append('category',category)
    }
        if (filters.level && filters.level !== 'null') {
          queryParams.append('level', filters.level);
        }
        const url = API + 'items?' + queryParams;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setSelectedCourses(data);
          })
          .catch(error => {
            console.error(error);
          });
      };
      
    return (
        <div>
      
            <div className='coursesclassification-background' style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%' }}>
                    <h1 className='text-white'>All Courses/{category}</h1>
                </div>
            </div>
            <div className='container-fluid'>
            <div className='row '>
         <div className='col-md-4 col-12 ml-md-5'style={{boxShadow:"0 0 10px rgba(0, 0, 0, 0.2)"}}>
        
    <h3 style={{ marginLeft: "20px" }}>categories</h3>
    {courseslist.map((course, index) => {
        return (
            <div key={index} style={{ marginLeft: "30px", marginBottom: "20px" }}>
                <label>
                    <input
                        type="radio"
                        name="course"
                        value={course.course}
                        checked={selectedCourse === course.course}
                        onChange={handleCourseChange}
                    />
                    {course.course}
                </label><br />
                <label>
                    <input
                        type="radio"
                        name="course"
                        value={course.course}
                        checked={selectedCourse === course.course}
                        onChange={handleCourseChange}
                        style={{ marginLeft: "20px" }} />
                    {course.project}
                </label>

            </div>

        )

    })}
    <hr style={{ height: "2px", backgroundColor: "white" }} />
    <div style={{ margin: "0px", marginLeft: '5vw' }}>
    <h3>Price</h3>
                   
                    <label>
                        <input type="radio" name="price" value="0" onChange={handlePriceChange} style={{ marginBottom: "20px" }} />
                        Free
                    </label><br />
                    <label>
                        <input type="radio" name="price" value="1" onChange={handlePriceChange} />
                        Paid
                    </label><br />
                </div>

                <hr style={{ height: "2px", backgroundColor: "white" }} />

                <div style={{ margin: "0px", marginLeft: '5vw' }}>
                    <h3>Level</h3>
            
                    <label>
                        <input type="radio" name="level" value="Beginner" onChange={handleLevelChange} style={{ marginBottom: "20px" }} />
                        Beginner
                    </label><br />
                    <label>
                        <input type="radio" name="level" value="Intermediate" onChange={handleLevelChange} style={{ marginBottom: "20px" }} />
                        Intermediate
                    </label><br />
                    <label>
                        <input type="radio" name="level" value="Advanced" onChange={handleLevelChange} style={{ marginBottom: "20px" }} />
                        Advanced
                    </label>
                </div>

                <hr style={{ height: "2px", backgroundColor: "white" }} />

                <div style={{ margin: "0px", marginLeft: '5vw' }}>
                    <h3>Language</h3>
                  
                    <label>
                        <input type="radio" name="language" value="English" onChange={handleLanguageChange} style={{ marginBottom: "20px" }} />
                        English
                    </label><br />
                </div>

                <hr style={{ height: "2px", backgroundColor: "white" }} />

                <div style={{ margin: "0px", marginLeft: '5vw' }}>
                    <h3>Ratings</h3>
                    <label>
                        <input type="radio" name="rating" value="1" onChange={handleRatingChange} style={{ marginBottom: "20px" }} />
                        <AiFillStar style={{ fill: "#e6ac00" }} />
                    </label><br />
                    <label>
                        <input type="radio" name="rating" value="2" onChange={handleRatingChange} style={{ marginBottom: "20px" }} />
                        <AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} />
                    </label><br />
                    <label>
                        <input type="radio" name="rating" value="3" onChange={handleRatingChange} style={{ marginBottom: "20px" }} />
                        <AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} />
                    </label><br />
                    <label>
                        <input type="radio" name="rating" value="4" onChange={handleRatingChange} style={{ marginBottom: "20px" }} />
                        <AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} />
                    </label><br />
                    <label>
                        <input type="radio" name="rating" value="5" onChange={handleRatingChange} style={{ marginBottom: "20px" }} />
                        <AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} /><AiFillStar style={{ fill: "#e6ac00" }} />
                    </label><br />
    </div>
         </div>
         <div className='col-md-8 col-12 m-0 p-0'>
         <div style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", height: "40px" }}>

<BsFillGridFill style={{ marginRight: "20px", height: "50px", width: "40px", padding: "10px" }} />
<TfiViewListAlt style={{ marginRight: "20px", height: "50px", width: "40px", padding: "10px" }} />
<span style={{ fontWeight: "bold", opacity: "0.5", marginRight: "0" }} className='display-block'>Showing 6 of 6 results</span>
<label for="sortBy" className='sortby-filters' >Sort By:</label>
<select name="sortBy" id="sortBy" style={{ border: "none", outline: "0px",backgroundColor:" #d9d9d9" }}>
    <option value="Newest">Newest</option>
    <option value="Highest Rating">Highest Rating</option>
    <option value="Discounted">Discounted</option>
    <option value="Lowest Price">Lowest Price</option>
    <option value="Highest Price">Highest Price</option>
</select>
</div>


{ selectedCourses?.length >=1  ? selectedCourses?.map((data,index)=>(
<div className='container-fluid'>
<div className='row mt-5' style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", marginBottom: "20px" }}>
<div className='col-md-4 col-12 '>
<img src={image} alt="" style={{ marginTop: "20px", marginLeft: "10px", marginBottom: "20px" }} className='coursesclassification-img'/>
</div>   
<div className='col-md-6'>
<div>
                    <p style={{ marginLeft: "20px", marginTop: "10px", fontSize: "20px", fontWeight: "bolder", marginBottom: "0px" }}>{data.name}</p>
                    <div style={{ marginBottom: "0px", marginLeft: "20px", fontWeight: "-moz-initial", opacity: "0.8", marginBottom: "5px" }}>{data.description}</div>
                    <MdSlowMotionVideo style={{ marginLeft: "20px" }} />
                    <span> 6lessons</span>
                    <BiTime style={{ marginLeft: "20px" }} />
                    <span>  {data.time}</span>
                    <MdSubtitles style={{ marginLeft: "20px" }} />
                    <span>English</span>
                    <div style={{ marginLeft: "20px", marginTop: "10px", display: "flex" }}>
                    <div>
  <button style={{ color: "white", border: "none", padding: "2px", margin: "0px", fontSize: "13px", borderRadius: "5px", textTransform: "capitalize" }} className='bg-primary'>{data.level}</button>
</div>

                        <div>
                            <button style={{ border: "none", padding: "0px 0px 0px 0px", marginLeft: "20px", fontSize: "13px", borderRadius: "5px" ,marginBottom:"20px"}} className='text-primary'>compare</button>
                        </div> 

</div>
</div>





</div>    

<div className='col-md-2 text-align-center'>
  <h3 style={{ marginRight: "13px",color:"black",marginTop:"40px"}}>Rp{data.price}</h3>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h5 style={{ textDecoration: "line-through", opacity: "0.6" }}>Rp4999</h5>
                            <div>
                                {stars.map((_, index) => (
                                    <AiOutlineStar key={index} />
                                ))}
                            </div>
                            <p>0 Ratings</p>
                        </div>

</div>    
    </div>
</div>
)):<div style={{top:"50%"}}>
<h1 className='text-center' >No Data Found</h1></div>}




         </div>
   
</div>
        </div>
        </div>
    )
}

export default Coursesclassification












