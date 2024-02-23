import React, { useState } from 'react';
import './Navbar.css';
import { FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoMdAddCircle } from 'react-icons/io';
import { courseslist } from '../data';
function Navbar() {

const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [projects,setProjects] = useState(false)

  const handleMenuToggleClick = () => {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    nav.classList.toggle('mobile-nav');
    menuToggle.classList.toggle('is-active');
  };

  const handleCategoriesHover = () => {
    setIsHovered(!isHovered);
    setProjects(false)
  };



  const handleCategoryClick = (course) => {
    setSelectedCategory(course);
    setProjects(true)
  };
const handleOutsideClick =() =>{
  setIsHovered(false)
  setProjects(false)
}

const hidecategories =() =>{
  setIsHovered(false)
}
const Removeuser =()=>{
  localStorage.removeItem("userdata")
  navigate("/login")
}


  return (
    <div className="page-wrapper">
      <div className="nav-wrapper">
        <div className="grad-bar"></div>
        <nav className="navbar">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
            alt="Company Logo"
          />
          <div className="menu-toggle" id="mobile-menu" onClick={handleMenuToggleClick}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <input type="text" placeholder="Search.." className="input" />
          <ul className="nav">
            <li className="nav-item" style={{width:"300px"}}>
              <a href="#" onClick={handleCategoriesHover}>
                Categories
                <FiChevronDown />
              </a>
              {isHovered && (
                <div
                  className="dropdown-content">
                  {courseslist?.map((item) => (
                    <div key={item.course}>
                      <p
                        style={{ textAlign: 'center', cursor: 'pointer',fontWeight:'bold',color:" #e6e6e6"}}
                        onClick={() => handleCategoryClick(item.course)}
           
                      >
                        {item.course}
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <FiChevronDown style={{color:" #737373", marginLeft: "auto",marginRight:"60px",marginTop:"auto"}}/>
                        </div>
                      
                      </p>
                      <Link to={`/courses/${item.course}`}>
                      {selectedCategory === item.course && projects && <p  style={{ textAlign: 'center', cursor: 'pointer',fontWeight:'bold'}}
                       onClick={hidecategories}>{item.project}</p> }
                    
                      </Link>
                    </div>
                  
                  ))}
                </div>
              )}
            </li>
 <div className='display-large'>   
  <Link to='/login' style={{textDecoration:"none",color:"black"}}>
    <li><a class="dropdown-item" href="#">LOGIN</a></li>
    </Link>
    <Link to='/signup'style={{textDecoration:"none",color:"black"}}>
    <li><a class="dropdown-item" href="#">SIGNUP</a></li>
    </Link>
  
    <Link to='/posted-courses'style={{textDecoration:"none",color:"black"}}>
    <li><a class="dropdown-item" href="#">MY COURSES</a></li>
    </Link>
    <Link to='/cart'style={{textDecoration:"none",color:"black"}}>
    <li><a class="dropdown-item" href="#">CART</a></li>
    </Link>
  
    </div>               
    <Link to="/addcourse">
     <IoMdAddCircle className='display-block123' style={{marginRight:"60px",width:"120px",height:"30px",color:"black"}}/>
     </Link>
           <div class="dropdown display-block123" style={{marginRight:"60px",width:"120px"}}>
  <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  <CgProfile style={{marginLeft:"20px",fontSize:"30px"}}  className="display-block123" />
  </a>

  <ul class="dropdown-menu">
  <Link to='/login' style={{textDecoration:"none"}}>
    <li><a class="dropdown-item" href="#">LOGIN</a></li>
    </Link>
    <Link to='/signup'style={{textDecoration:"none"}}>
    <li><a class="dropdown-item" href="#">SIGNUP</a></li>
    </Link>
    <Link to='/posted-courses'style={{textDecoration:"none"}}>
    <li><a class="dropdown-item" href="#">MY COURSES</a></li>
    </Link>
    <Link to='/cart'style={{textDecoration:"none"}}>
    <li><a class="dropdown-item" href="#">CART</a></li>
    </Link>
    <li><a class="dropdown-item" href="#" onClick={Removeuser}>LOGOUT</a></li>
  </ul>
</div>
          </ul>
        </nav>
      </div>
      {isHovered &&  (
        <div
          style={{
            position: 'fixed',
            top:0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onClick={handleOutsideClick}
        />
      )}


    </div>
  );
}

export default Navbar;






















