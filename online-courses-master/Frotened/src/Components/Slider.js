import { useState } from 'react';
import Slider from 'react-slick';
import './Slider.css';

// import icons
import {BsArrowLeft, BsArrowRight,} from 'react-icons/bs';

// import images
import img1 from '../Images/Screenshot 2023-04-18 14134888.png';
import img2 from '../Images/Screenshot 2023-04-19 113055.png';
import img3 from '../Images/Screenshot 2023-04-18 150652.png';
import img4 from '../Images/Screenshot 2023-04-18 150857.png';

const images = [img1, img1, img1, img1];

function SampleNextArrow({onClick}) {
  return (
    <div className='arrow arrow-right' onClick={onClick}>
      <BsArrowRight/>
    </div>
  );
}

function SamplePrevArrow({onClick}) {
  return (
    <div className='arrow arrow-left' onClick={onClick}>
      <BsArrowLeft/>
    </div>
  );
}
function EmptyArrow({onClick}) {
  return (
    <div></div>
  );
}

function Sliders() {

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    beforeChange: (current, next)=>setSlideIndex(next),
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (current, next) => (
      <div className={current === slideIndex ? 'dot dot-active' : 'dot'}>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          nextArrow: <EmptyArrow />,
          prevArrow: <EmptyArrow />,
        }
      }]
  };

  return (
    <div className="container">
   
        <div className="slider">
      <Slider {...settings}>
          {
            images.map((img, index)=>(
              <div className={index === slideIndex ? 'slide slide-active': 'slide'} key={index}>
         <div class="card">
    <img src="https://e.telugurajyam.com/wp-content/uploads/2020/11/pawan-4.jpg" alt="Product Image" className='image-container'/>
    <div class="description">
      <h3>Product Title</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac felis sit amet orci hendrerit ullamcorper. Suspendisse potenti.</p>
      <a href="#" class="buy-button">VIEW</a>
    </div>
  </div>
              </div>
            ))
          }
      </Slider>
        </div>
    </div>
  );
}

export default Sliders;