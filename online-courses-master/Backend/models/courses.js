const mongoose = require('mongoose');

const courses = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  videos: [{
    topic: {
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    _id: false
  }],
  level: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  ratings: [{
    comment:{
        type: String
    },
    rating: {
      type: Number
    },
    postedBy: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    _id:false
  }],
  averagerating:{
    type:Number,
    default:0
  }
 });

module.exports = mongoose.model('courses', courses);
