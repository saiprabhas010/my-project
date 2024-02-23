import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './Pages/Cart';
import Coursedetailpage from './Pages/Coursedetailpage';
import Coursesclassification from './Pages/Coursesclassification';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Footer from './Components/Footer';
import ScrollToTop from './Pages/Scrolltotop';
import Navbar from './Components/Navbar';
import Comparecourses from './Pages/Comparecourses';
import Forgotpassword from './Pages/Forgotpassword';
import Addcourse from './Pages/Addcourse/Addcourse';
import Exploreallcourses from './Pages/Exploreallcourses';
import Mycourses from './Components/Mycourses';
import Updatedcourse from './Pages/Updatedcourse';
import Particularcourse from './Pages/Particularcourse';
import Sucess from './Components/Sucess';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  
  function App() {
  
  return (
    <BrowserRouter>
    <ScrollToTop />
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Homepage />} />  
      <Route exact path="/signup" element={<Signup /> } />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/course/:id" element={<Coursedetailpage />} />    
      <Route exact path="/courses/:category" element={<Coursesclassification />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/comparecourses" element={<Comparecourses />} />
      <Route exact path="/forgotpassword" element={<Forgotpassword />} />
      <Route exact path="/addcourse" element={<Addcourse />} />
      <Route exact path="/Explore-all-courses" element={<Exploreallcourses />} />
      <Route exact path="/posted-courses" element={<Mycourses />} />
      <Route exact path="/:id/update-course" element={<Updatedcourse />} />
      <Route exact path="/particular-course/:userId" element={<Particularcourse />} />
      <Route exact path='/success' element={<Sucess/>} />
    
    </Routes>  
  </BrowserRouter>
  
  );
}

export default App;
