import React, { useState } from 'react';
import { AiOutlinePlus, AiFillCamera } from 'react-icons/ai';
import './Addcourse.css';
import axios from 'axios';
import { API } from '../../Api';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { toast } from 'react-toastify'
function Addcourse() {
 
  const userdata = JSON.parse(localStorage.getItem('userdata')); 
  const [components, setComponents] = useState([{ id: 1, video: '', overview: '' }]);

   const [image, setImage] = useState("");
   const [coursecategory, setCoursecategory] = useState("");
  const [courserequirements, setCourserequirements] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [courseprice, setCourseprice] = useState();
 const [pavan,setPavan] = useState(false)
  const addComponent = () => {
    setComponents([...components, { id: components.length + 1, video: '', overview: '' }]);
  };


  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedComponents = [...components];
    updatedComponents[index][name] = value;
    setComponents(updatedComponents);
  };


  const createForm = async (e) => {
    e.preventDefault();
//CREATE COURSE 
if(image == ''|| coursecategory == ''|| courserequirements == ''||  selectedTime == ''|| 
name== ''|| description == ''||  selectedValue== ''||  courseprice == '' || 
components[components.length-1].overview == '' || components[components.length-1].video == ''){
  toast.error(`Please fill all required fields`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
 
}

else{
  setPavan(true)
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
  

await axios.post(API + "add-course", data).then((data) =>{ 
    console.log(data);
    setPavan(false)
    toast.success(`Course added suceessfully`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });}).catch((error)=>{
        toast.error(`${error.message} please try again`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setPavan(false)
      })
    }
  
  }
  return (
    <>
     {userdata ?
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
       
            <h2 className="card-title text-center">Add Your Course</h2><div className="card-body py-md-4 p-5">
                  <form>
                    <div className="form-group">
                      <input
                 
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Course name"
                
                        value={name }
                     
                        onChange={(e) => setName(e.target.value)} />
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

                {!pavan ?  <div className="text-center mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg bg-danger"
                        onClick={createForm}
                      >
                        Upload Course
                      </button>
                    </div>:
                    <>
                    <div className="text-center mt-5">
 <Button variant="primary"   className="btn btn-primary btn-block btn-lg">
   <Spinner
     as="span"
     animation="border"
   
     size="sm"
     role="status"
     aria-hidden="true"
   />
   Uploading...
 </Button>
 </div>
 </>}
                  </form>
                </div>
          </div>
        </div>
      </div>
    </div>:"pleaseLogin"}</>
  );
}

export default Addcourse;
