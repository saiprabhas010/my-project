const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic:{type:String,default:'https://th.bing.com/th/id/OIP.66elZ0rdKa61JlWQw8G7XgHaGf?w=211&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
  cartcourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
  cartprice: { type:Number, default:0},
  purchasedcourses:[{type: mongoose.Schema.Types.ObjectId,ref:'courses'}]

});
const User = mongoose.model('User', userSchema);
module.exports = User;
