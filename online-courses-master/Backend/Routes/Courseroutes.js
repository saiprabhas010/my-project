const express = require('express');
const router = express.Router();
const Courses = require("../models/courses")
const User = require('../models/users');
const cors = require("cors")
const middleware = require("../Middleware/Middleware");


router.get("/all-courses", async (req, res) => {
    try {
      const courses = await Courses.find({});
      res.status(200).json({ courses });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });
  


 








router.get("/course/:id",async (req,res)=>{
const {id} = req.params;
const individualcourse = await Courses.findById(id);
 res.status(200).send(individualcourse)
})




router.post("/add-course",async(req,res)=>{
    const {createdBy,name,category,description,videos,level,price,time,requirements,author,image} = req.body;
    try{
        const courseDetails = new Courses({
          createdBy,name,category,description,videos,level,price,time,requirements,author,image
        })
        courseDetails.save()
        res.status(200).json({courseDetails})
    }catch(e){
        res.status(500).json({error:e.message})
    }
})

// PUT /users/:id
router.put('/course/:id', async (req, res) => {
  const id = req.params.id;
try {
  const course = await Courses.findById(id);
if (!course) {
      return res.status(404).send({ error: 'course not found' });
    }else{
      const courses = await Courses.findByIdAndUpdate(course,req.body,{
        new :true,
        runValidators: true,
        useUnified:false,
      })
      courses.save()
      res.status(200).json({courses})
    }


  } catch (error) {
    res.status(400).send(error);
  }
});




//DELETE COURSE
router.delete("/delete-course/:id", async (req,res)=>{
  const {id} = req.params.id;
const course_id = await Courses.findById(id)
try{
if(course_id){
  const course = await Courses.findByIdAndDelete(id);
  res.status(200).send("Course successfully deleted")
}else{
  res.status(400).send("Course Not Found")
}
}catch(e){
  res.status(500).json({error:e.message})
}
})




// //comments for courses
// router.post('/courses/:id/comments', async (req, res) => {
//   const courseId = req.params.id;
//   const { text, userId } = req.body;

//   try {
//     const course = await Courses.findById(courseId);
//     if (!course) {
//       return res.status(404).send({ error: 'Course not found' });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ error: 'User not found' });
//     }

//     const comment = { text, postedBy:{id:user,name:`${user.firstname}${user.lastname}`}  };

//     const updatedCourse = await Courses.findByIdAndUpdate(courseId, { $push: { comments: comment } }, { new: true });

//     res.status(200).send({ message: 'Comment added successfully', comments: updatedCourse.comments });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });



// //update comments
// router.put("/update-comments/:commentId/:courseId" , async (req,res)=>{
//   const {commentId,courseId} = req.params;
// const {text} =req.body
//   try{
// const course = await Courses.findById(courseId)
// const commentIndex = course.comments.findIndex(comment => comment._id == commentId);
// (course.comments[commentIndex].text = text );
//  course.save()
//  res.status(200).json(course.comments)

//   } catch (error) {
//     res.status(400).send(error);
//   }
// })

// //delete comment
// router.delete("/delete-comment/:commentId/:courseId" , async (req,res)=>{
//   const {commentId,courseId} = req.params;
// const findindex = await Courses.findById(courseId)
// const findIndex = findindex.comments.findIndex(comment=>comment._id == commentId)
// if (findIndex !== -1){
//   const deletecomment = await Courses.findByIdAndUpdate(courseId,{$pull:{comments:{_id:commentId}}},{new:true})
// }else{
//   console.log("lklllllllllllllllllllllllll")
// }
// })




 router.get("/courses/:category", async (req, res) => {
  const { category } = req.params;
 
  const categoryData = category.trim().toLowerCase();
  try {
    const courses = await Courses.find({ name: { $regex: categoryData, $options: "i" } });
 
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).send(error);
  }
});


//Ratings
router.post('/add-rating/:id', async (req, res) => {
  const courseId = req.params.id;
  const { rating, postedBy, user, comment } = req.body;

  try {
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    course.ratings.push({ comment, rating, postedBy, user });

    const totalRatings = course.ratings.length;
    const sumOfRatings = course.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = sumOfRatings / totalRatings;

    course.averagerating = averageRating;
 console.log(averageRating)
    await course.save();

    res.status(200).json({ message: 'Rating added successfully', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});










//login user uploaded courses
router.get("/:userId/posted-courses",async(req,res)=>{
  try{
   const {userId} = req.params;
const userpostedcourses = await Courses.find({createdBy:userId});
    res.status(200).json({userpostedcourses})
  }catch (error) {
  console.error(error);
  res.status(400).send({ error: error.message });
}

})




//Get purchased courses
router.get('/purchase-courses/:userId',async(req,res)=>{
  const {userId} = req.params;
 
  try{
const userdata = await User.findById(userId);

const purchasedcourse = await Courses.find({_id:userdata.purchasedcourses})

res.status(200).json({purchasedcourse})
  }catch(e){
    res.status(400).json(e)
  }
})






//FILTER COURSES
router.get('/items', async (req, res) => {
  try {
    const filters = req.query;
console.log(filters,'1245')
    const query = {};
if (filters.averagerating) {
      query.averagerating = parseInt(filters.averagerating);
    }
if (filters.price) {
      console.log(filters.price,typeof filters.price)
      if(filters.price == 1){
       query.price = {$gt :0}; 
      }else{
        query.price = 0; 
      }
    }

if (filters.category) {
      query.category = filters.category;
    }
if (filters.level) {
      query.level = filters.level;
    }


    console.log('MongoDB Query:', query); 

    const items = await Courses.find(query);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router