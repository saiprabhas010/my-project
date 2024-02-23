const express = require('express');
const router = express.Router();
const Courses = require("../models/courses")
const User = require('../models/users');
const getRawBody = require('raw-body')
const cors = require('cors')
const middleware = require("../Middleware/Middleware");
const bodyParser = require('body-parser');
require("dotenv").config()
const stripe = require('stripe')("sk_test_51NQbWnSBJpcTwFBa9NUDXBWFBfcHCOJaJO4WwSxLR2c3PxjRJQyE4Y3Q0zOYWZIvX0H30oHfiQweHRs8YFZWSGa000pY12nGER")

router.use(cors({
  origin:"*"
}))
router.use(bodyParser.json());


router.post('/create-checkout-session', async (req, res) => {
  const porductId = req.body.cartItems?.map((_id)=>(_id._id));
    const customer = await stripe.customers.create({
        metadata: {
          userId: req.body.userId,
          cart: JSON.stringify(porductId),
        },
      });
    const line_items = req.body?.cartItems.map((course)=>{
        return{
     price_data: {
          currency: 'INR',
          product_data: {
            name: course.name,
            images:[course.image],
            description:course.category,
            metadata:{
                id:course._id,
            }
          },
          unit_amount: (course.price)*100,
        },
        quantity: 1,
    }
    })
  const session = await stripe.checkout.sessions.create({
    customer:customer.id,
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  if(!session.payment_status == 'unpaid'){
  console.log('Data logged after clicking "Pay":');
  }
  res.send({url:session.url});
 
});





//webhook authentification



router.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {

  const sig = request.headers['stripe-signature'];
  let endpointSecret;
    endpointSecret = "whsec_sD4FtnqU8HbYvFa6w6M0nr5U2U0ncDfI";
  let data;
  let eventType;
if(endpointSecret){
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body,sig,endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object;
  eventType = event.type;
}else{
   data = request.body.data.object;
   eventType = request.body.type;
}


if(eventType === "checkout.session.completed"){
 stripe.customers
    .retrieve(data.customer)
    .then(async (customer) => {
      try {
    const user= await User.findById(customer.metadata.userId)
    await  (JSON.parse(customer.metadata.cart)).map( (cartItem)=> {
      user.purchasedcourses?.push(cartItem);
       user.cartcourses =[];
      user.cartprice = 0});
  user.save()
  } catch (err) {
       console.log(err);
      }
    })
    .catch((err) => console.log(err.message));
}
 
  response.send().end();
});









module.exports = router