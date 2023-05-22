const jwt= require("jsonwebtoken")
const blacklist= require("../config/blacklist")
const User= require("../models/user")
require("dotenv").config()

const authenticaterUser= async(req,res,next)=>{
	try {
		
const accessToken= req.headers.authorization?.split(" ")[1]

if(!accessToken){
	return res.status(401).send({msg:"Access Token not found"})

}

if(blacklist.isTokenBlacklisted(accessToken)){
	return res.status(401).send({msg:"Access token revoked"})
}

const {userId}= jwt.verify(accessToken,process.env.JWT_SECRET)

const user= await User.findById(userId)

if(!user){
	return res.send({msg:"user not found"}).status(401)
}

req.user=user
next()

	} catch (error) {
		
	}
}

const authenticaterSeller= (req,res,next)=>{
	if(req.user.role !=="seller"){
		return res.status(401).send({msg:"Only authorised for seller"})
	}
	next()
}

module.exports={authenticaterUser,authenticaterSeller}