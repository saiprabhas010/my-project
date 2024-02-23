const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken")
const User = require('../models/users');
const middleware = require("../Middleware/Middleware")
const { google, appengine_v1 } = require('googleapis');
const nodemailer = require('nodemailer');


const Courses = require('../models/courses');
const { OAuth2 } = google.auth;



//signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname,email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
 const user = new User({ firstname,lastname, email, password });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Login route
router.post("/login",async(req,res)=>{
  const {email,password} = req.body;
  try{
    const existingUser = await User.findOne({ email });
    if(existingUser){
      if(existingUser.password == password){
        let payload={ 
          user:{
              id:existingUser.id
          }
         
      }
      
      jwt.sign(payload,"jwtpassword",(error,token)=>{
       if(error) throw error
     return res.json({token,existingUser})
      
      })
      }else{
        return res.status(400).send("password wrong")
      }
    }else{
      return  res.status(400).send("email wrong")
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})





require("dotenv").config()
const app = express();
app.use(express.json());
let savedOTPS ={
  
};

var transporter = nodemailer.createTransport(
  {
    service:"gmail",
    port:587,
    secure:true,
    logger:false,
    debug:false,
    secureConnections:false,
      auth: {
          user: 'pavanirrinki01@gmail.com',
          pass: 'hhqavavbezymtlul'
      },
      tls:{
        rejectUnAuthorized:true
      }
  }
);
router.post('/sendotp', async (req, res) => {
  let email = req.body.email;
  const emaildata = await User.findOne({email});
  if(emaildata){
  let digits = '0123456789';
  let limit = 4;
  let otp = ''
  for (i = 0; i < limit; i++) {
      otp += digits[Math.floor(Math.random() * 10)];

  }
  var options = {
      from: 'pavanirrinki01@gmail.com',
      to: `${email}`,
      subject: "Testing node emails",
      html: `<p>Enter the otp: ${otp} to verify your email address</p>`

  };

  transporter.sendMail(
      options, function (error, info) {
          if (error) {
              console.log(error);
              res.status(500).send("couldn't send")
          }
          else {
              savedOTPS[email] = otp;
              console.log(savedOTPS)
              setTimeout(
                  () => {
                      delete savedOTPS.email
                  }, 60000
              )
              res.send("SEND OTP SUCCESSFULLY")
          }

      }
  )
    }else{
      res.status(500).send("Email not found")
    }
})

router.post('/verify', (req, res) => {

const {email,otprecived} = req.body;
console.log(email,otprecived)
 console.log(savedOTPS)
  if (savedOTPS[email] == otprecived) {
      res.send("VERIFIED OTP");
  }
  else {
      res.status(500).send("Invalid OTP")
  }
})

router.put("/forgot-password", async (req, res) => {
  const { email, password } = req.body;
  try {
  
    const updatedUser = await User.findOneAndUpdate({ email }, { password }, { new: true });

   res.status(200).send("Password updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating password");
  }
});



router.post("/add-courses-in-cart", middleware, async (req, res) => {
  const { email, course_id } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cartcourses.includes(course_id)) {
      user.cartcourses.push(course_id);
      const course = await Courses.findById(course_id);
      user.cartprice += Number(course.price.toFixed(0));
      await user.save();

      const particular_user = await User.findOne({ email });
      return res.status(200).json({ particular_user });
    } else {
      return res.status(500).send("Course already exists in your cart");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});



router.post("/remove-courses-in-cart", async (req, res) => {
  const { email, course_id } = req.body;
  console.log(email,course_id)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cartcourses.includes(course_id)) {
      user.cartcourses.pull(course_id);
      const course = await Courses.findById(course_id);
      user.cartprice -= Number(course.price.toFixed(0));
      await user.save();

      const particular_user = await User.findOne({ email });
      return res.status(200).json({ particular_user });
    } else {
      return res.status(500).send("Course already exists in your cart");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});













//This route is used to find find the bulk ids data 
router.get("/cart-items",middleware,async (req,res)=>{
const {email} = req.query;
const userdata = await User.findOne({email})
const cartcourses  = userdata?.cartcourses;
const products = await Courses.find({_id:{$in:cartcourses}});
res.status(200).send({products,userdata})

})



module.exports = router;





