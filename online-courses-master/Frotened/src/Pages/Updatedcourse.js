import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiFillCamera } from 'react-icons/ai';
import './Addcourse/Addcourse.css';
import axios from 'axios';
import { API } from '../Api';
import { useLocation,useParams } from 'react-router-dom';

function Updatedcourse() {
  const {id} = useParams()
  const userdata = JSON.parse(localStorage.getItem('userdata')); 
  const [components, setComponents] = useState([{ id: 1, video: '', overview: '' }]);
  const [updatedcourse,setUpdatedcourse] = useState(null)
   const [image, setImage] = useState("");
   const [coursecategory, setCoursecategory] = useState("");
  const [courserequirements, setCourserequirements] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [courseprice, setCourseprice] = useState();
  
  const location = useLocation()
  console.log("location",location)
  useEffect(()=>{
fetchdata()
 console.log("123467")
  },[])
  const fetchdata = async ()=>{
   const postedcourses = await axios.get(API+`course/${id}`).then(res=>(res.data))
   setUpdatedcourse(postedcourses)
  }
  useEffect(()=>{
     if(updatedcourse){
      setName(updatedcourse?.name);
      setDescription(updatedcourse?.description);
      setCoursecategory(updatedcourse?.category)
      const videos = updatedcourse?.videos.map((video, index) => ({
        id: index + 1,
        video: video?.topic?.url,
        overview: video.topic.name
      }));

      setComponents(videos);
     }
     setSelectedValue(updatedcourse?.level);
     setCourseprice(updatedcourse?.price);
     setCourserequirements(updatedcourse?.requirements);
     setSelectedTime(updatedcourse?.time)
     setImage(updatedcourse?.image)
    },[updatedcourse])
  const addComponent = () => {
    setComponents([...components, { id: components.length + 1, video: '', overview: '' }]);
  };

console.log("lllllllllllllllllll",updatedcourse)
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedComponents = [...components];
    updatedComponents[index][name] = value;
    setComponents(updatedComponents);
  };

  const createForm = async (e) => {
    e.preventDefault();
//CREATE COURSE 

    const formDataArray = [];
    for (const component of components) {
      const formData = new FormData();
      formData.append("file", component.video);
      formData.append("upload_preset", "insta-clone");
      formData.append("cloud_name", "cdvbvggl5f");
      formDataArray.push(formData);
    }
  
    const videoUrls = [];
    for (const formData of formDataArray) {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvbvggl5f/upload", {
        method: "post",
        body: formData,
      });
      const data = await res.json();
      videoUrls.push(data.url);
      console.log(videoUrls)
    }
  
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "insta-clone");
    imageData.append("cloud_name", "cdvbvggl5f");
  
    const imageRes = await fetch("https://api.cloudinary.com/v1_1/dvbvggl5f/upload", {
      method: "post",
      body: imageData,
    });
    const imagesData = await imageRes.json();
    const imageUrl = imagesData.url;
  
    const data = {
      createdBy:userdata?.existingUser._id,
      name: name,
      category: coursecategory,
      description: description,
      image: imageUrl,
      videos: components.map((component, index) => ({
        topic: {
          url: videoUrls[index],
          name: component.overview,
        },
      })),
      level: selectedValue,
      price: courseprice,
      time: selectedTime,
      author: "Programming",
      requirements: courserequirements,
    }
 
   await axios.put(API + `course/${id}`, data).then((data) => console.log(data));
    console.log('Data:', data);

}

  return (
    <>
     {userdata ?
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
       
            <h2 className="card-title text-center">update Your Course</h2><div className="card-body py-md-4 p-5">
                  <form>
                    <div className="form-group">
                      <input
                 
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Course name"
                        value={name}
                     onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Course Category"
                        value={coursecategory}
                        onChange={(e) => setCoursecategory(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="description"
                        rows="4"
                        cols="50"
                        placeholder="Description of course"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="custom-file-input">
                      <input
                        type="file"
                        id="fileInput"
                        className="file-input"
                        placeholder="Select a file"
                        onChange={(event) => setImage(event.target.files[0])} />
                      <label htmlFor="fileInput" className="label-input">
                        Choose Best Image Representing Your Course <span style={{ marginLeft: '0px' }}><AiFillCamera /></span>
                      </label>
               

              { !image && <img src={ updatedcourse?.image } />}
                    </div>

                    {components.map((component, index) => (
                      <div key={component.id}>
                        <div className="form-group mt-4">
                          <div className="custom-file-input">
                            <input
                              type="file"
                          
                              id={`video-upload-${component.id}`}
                              name={`video-upload-${component.id}`}
                             
                            
                              onChange={(e) => {
                             const updatedComponents = [...components];
                                updatedComponents[index].video = e.target.files[0];
                                setComponents(updatedComponents);
                                
                              } } />
                       
                          </div>
                        </div>
                       {component.video && 
                       <a href={(component.video)} target='_blank'>{(JSON.stringify(component.video)).replace(/{|}/g, '')}</a>}
                     
                        <div className="form-group mt-4">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="overview"
                              placeholder="Overview of video"
                              value={component.overview}
                              onChange={(event) => handleInputChange(event, index)} />
                            {index === components.length - 1 && (
                              <div className="input-group-append">
                                <span
                                  className="input-group-text"
                                  style={{ borderRadius: '70%', marginLeft: '10px' }}
                                  onClick={addComponent}
                                >
                                  <AiOutlinePlus />
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <select
                      style={{ width: "100%", border: "none" }}
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                    >
                      <option value="">--choose level of course--</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Hard">Hard</option>
                    </select>

                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control mt-3"
                        id="name"
                        placeholder="Price of course"
                        value={courseprice}
                        onChange={(e) => setCourseprice(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="description"
                        rows="4"
                        cols="50"
                        placeholder="Requirements for course"
                        value={courserequirements}
                        onChange={(e) => setCourserequirements(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Time duration of course"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)} />
                    </div>

                    <div className="text-center mt-5">
                      <button
                        type="submit"
                        className="btn btn-danger btn-block btn-lg"
                        onClick={createForm}
                      >
                        Update Course
                      </button>
                    </div>
                  </form>
                </div>
          </div>
        </div>
      </div>
    </div>:"pleaseLogin"}</>
  );
}

export default Updatedcourse;












