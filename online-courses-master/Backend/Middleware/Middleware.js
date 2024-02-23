const jwt = require("jsonwebtoken")
//middleware is afunction used to access the protected routes
const express = require("express")
module.exports = function(req,res,next){
    try{
let token = req.header("x-token") // we can store user jwt token in headers of x-token
if(!token){                        // jwt token already stored in headers
    return res.status(404).send("token not found") 
}
let decode = jwt.verify(token,"jwtpassword") //if token present verify with user id and access protected route
req.user = decode.user
next() //next function pass to next middleware
    }catch(error){
        console.log(error)
        return res.status(400).send('Authentification error')
            }
        }