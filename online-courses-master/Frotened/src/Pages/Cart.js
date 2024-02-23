import React, { useEffect,useState } from 'react'
import image from "../Images/OIP.jpg"
import axios from 'axios';
import { API } from '../Api';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify'
import { AiOutlineSearch } from 'react-icons/ai';



function Cart() { 

  const [data,setData] = useState([])
 
  const [toggle,setToggle] = useState(false)
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  const userId = userdata?.existingUser._id
  const [coursedata,setCoursedata] = useState(null)
  useEffect(()=>{
axios.get(API+`purchase-courses/${userId}`).then(res=>setCoursedata(res.data))
  },[])
  console.log("coursedata",coursedata) 
  useEffect(() => {
 if(userdata){
    axios.get(API + 'cart-items', {
      headers: {
        'x-token': userdata.token, 
        'Content-Type': 'application/json'
     },   
     params: {
      email: userdata.existingUser.email
    }
    })
    .then(res => setData(res.data))
    .catch(error => {
      console.error('Error fetching cart items:', error);
    });
 }
  }, [toggle]);
  
function Removefromcart(id,name){
 axios.post(API+"remove-courses-in-cart",{email:userdata.existingUser.email,course_id:id}).then((res)=>{
  setToggle(!toggle);
  toast.error(`${name} Removed to cart`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })})
 
}
console.log("dataaaaaaaaaaaa",data)
const Handlepayments=async (cartpricedata,products)=>{
const order_courses = []
 products.map((data)=>order_courses.push(data._id))
 
  const  cartItems1 = data.products;
  const cartItems =await cartItems1?.filter((element) => !data.userdata.purchasedcourses.includes(element._id));
console.log("cartpricedata",products)


var purchasedCoursesData = JSON.stringify(order_courses);
console.log(purchasedCoursesData,'lllllllllllllllllllll')


const { data: { order } } = await axios.post(API + "check-out", { cartItems, userId,cartpricedata })
 

var options = {
  key: "rzp_test_JWyrTqAqINhszJ",
  amount: Number(cartpricedata* 100),
  currency: "INR",
  name: "Acme Corp",
  image: "https://thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg",
  order_id: order.id,
  description: "Tutorial of RazorPay",
  callback_url: API + "paymentverification",
  prefill: {
    name: "Gaurav Kumar",
    email: "gaurav.kumar@example.com",
    contact: "9000090000",
    address: "Razorpay Corporate Office",
    totalPrice: "13000",
    quantity: "9"
  },
  notes: {
    "address": "Razorpay Corporate Office",
    "purchasedcourses" :  purchasedCoursesData,
     "userId":JSON.stringify(userId)
 
},
  theme: {
    color: "#3399cc"
  }
};


var rzp1 = new window.Razorpay(options);


rzp1.open();




}
  return (
    <div>
   
<div className='bg-danger mt-3'>
        <div style={{ height: "200px", display: "flex", justifyContent: "space-between" }}>
          <h1 className='text-white'>Home/Shopping Cart</h1>
          <img src={image} alt="" className='bg-danger' />
        </div>
      </div>
      <div>
   <h6  style={{ marginTop: "20px", marginLeft: "30px" }}>{coursedata ? coursedata?.purchasedcourse?.length:0} Purchased courses</h6>
   <div class="col-md-9 col-12">
    {coursedata?.purchasedcourse?.length >=1 ? coursedata?.purchasedcourse?.map((course,index)=>(
      <Link to={`/particular-course/${course._id}`} style={{textDecoration:"none"}}>
              <div className="card mb-5">
                <button type="button" className="close" aria-label="Close">
               
                </button>
                <div className="row no-gutters">
                  <div className="col-md-3 display-block">

                    <img src={course.image} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-7 col-9">
                    <div className="card-body">
                      <h5 className="card-title">{course.name}</h5>
                      <p className="card-text">{course.description}</p>

                    </div>
                  </div>
                  <div className="col-md-2 col-3">
                    <div className="card-body">
                      <p className="card-text"><b>${course.price}</b></p>

                    </div>

                  </div>

                </div>
              </div>
              </Link>
           )):"NO DATA"}
  
     </div>
    </div>  
      <h6 style={{ marginTop: "20px", marginLeft: "30px" }}>{data ? data?.products?.length:0} Courses in your cart</h6>

      <div class="container ">
          <div class="row">

            <div class="col-md-9 col-12">
    {data?.products?.length >=1 ? data.products?.map((course,index)=>(
              <div className="card mb-5">
                <button type="button" className="close" aria-label="Close">
                  <span aria-hidden="true" onClick={()=>Removefromcart(course._id,course.name)}>&times;</span>
                </button>
                <div className="row no-gutters">
                  <div className="col-md-3 display-block">

                    <img src={course.image} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-7 col-9">
                    <div className="card-body">
                      <h5 className="card-title">{course.name}</h5>
                      <p className="card-text">{course.description}</p>

                    </div>
                  </div>
                  <div className="col-md-2 col-3">
                    <div className="card-body">
                      <p className="card-text"><b>${course.price}</b></p>

                    </div>

                  </div>

                </div>
              </div>
           )):"NO DATA"}
  
     </div>

        
            <div className='col-md-3'>

              <div class="card margin-top">
                <div class="card-header ">
                  <h3>Total:<span style={{marginLeft:"20px"}} class="card-title text-danger">${data?.userdata?.cartprice}</span></h3>
                </div>
                <div class="card-body">
                  <h4 class="card-title text-danger">Rp 1299</h4>
                  <h5 style={{ textDecoration: "line-through", opacity: "0.6" }}>Rp4999</h5>
                </div>
                <div style={{ display: "flex", position: "relative" }}>
                  <input

                    type="text"
                    placeholder="Apply coupon"
                    style={{
                      width: "90%",
                      border: "1px solid rgba(0, 0, 0, 0.5)",
                      borderRadius: "5px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      padding: "5px 10px 5px 10px",
                    }} />
                  <span style={{ position: "absolute", top: "0", right: "0%", bottom: "0" }}>
                    <button className='bg-danger text-white' style={{ border: "none", fontWeight: "20px", borderRadius: "5px", padding: "5px 10px 8px 10px", marginRight: "20px", }}>Apply</button>
                  </span>



                </div>
                <button style={{ position: "relative", width: "100%", marginTop: "20px", border: "none", borderRadius: "5px", padding: "5px 0px 5px 0px" }} className='bg-danger text-white'
                 onClick={()=>Handlepayments(data?.userdata?.cartprice,data.products)}>Checkout</button>
              </div>
            </div>
          </div>
        </div>



    </div>
  )
}

export default Cart;
