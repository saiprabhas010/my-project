const express = require('express');
const crypto = require("crypto")
const router = express.Router();
const Razorpay = require("razorpay");
const User = require('../models/users')
const Purchase_course = require('../models/courses')
const instance = new Razorpay({
  key_id: 'rzp_test_JWyrTqAqINhszJ',
  key_secret: 'pbzdGznigLLTsRBKwtmIR4kZ',
});

router.post('/check-out', async (req, res) => {
 
  const rzpOptions = {
    amount: Number(req.body.cartpricedata * 100),
    currency: "INR",
   // Merge additional data from the frontend options into rzpOptions
  };
 
  try {
    const order = await instance.orders.create(rzpOptions);
    res.status(200).json({ order });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message)
  }
});

router.post('/paymentverification', async (req, res) => {
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
 
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256",'pbzdGznigLLTsRBKwtmIR4kZ' )
    .update(body.toString())
    .digest("hex");
 const isAuthentic = expectedSignature === razorpay_signature;
 if(isAuthentic){
  await  instance.payments.fetch(razorpay_payment_id)
      .then(async (payment) => {
        if(payment.status == "captured"){
          console.log("ooooooooo",payment)
          const user = await User.findById(JSON.parse(payment.notes.userId))
          const data = await Purchase_course.find({_id:(JSON.parse(payment.notes.purchasedcourses))})
     data.forEach((course)=>{
          user.purchasedcourses?.push(course);
          user.cartcourses =[];
         user.cartprice = 0
           })
    await user.save()
        res.redirect('http://localhost:3005/success')
      }
      }).catch((error)=>res.status(500).json(error.message))
    }
});

module.exports = router;



























// try {
//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256",'pbzdGznigLLTsRBKwtmIR4kZ')
//     .update(body.toString())
//     .digest("hex");
//    const isAuthentic = expectedSignature === razorpay_signature;
//    console.log('expectedSignature',expectedSignature)
//    console.log('razorpay_signature',razorpay_signature)
//    if(isAuthentic){
//   await  instance.payments.fetch(razorpay_payment_id)
//       .then(async (payment) => {
//         console.log("Payment details:", payment.notes.purchasedcourses);
  
//         const data = await Purchase_course.find({_id:(JSON.parse(payment.notes.purchasedcourses))})
//         // data.map((course)=>{
//         //   user.purchasedcourses?.push(cartItem);
//         //   user.cartcourses =[];
//         //  user.cartprice = 0
//         // })
//        })
      
//       .catch((error) => {
//         console.error("Error fetching payment:", error);
//       });
     

//     res.status(200).send("Payment verification successful");
//     }else{
//       console.log("error")
//     }
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }