const bcrypt= require("bcrypt")
const User= require("../models/user")
const jwt= require("../config/jwt")
const blacklist= require("../config/blacklist")


const signup= async(req,res)=>{

try {
	
const {userName,password,role}= req.body

const existingUSer= await User.findOne({userName});

if(existingUSer){
	return res.status(400).send({msg:"Username is already exist"})
}

const hashedPassword= await bcrypt.hash(password,8)

const newUser= new User({userName,password:hashedPassword,role})
await newUser.save()
res.status(200).send({msg:"User Created Successfully"}) 

} catch (error) {
	res.send({msg:"Internal Error"})
}

}


const login= async(req,res)=>{

	try {
		const {userName,password}= req.body

const user= await User.findOne({userName});

if(!user){
	return res.status(400).send({msg:"Username not exist"})
}

const isMatch= await bcrypt.compare(password,user.password)

if(!isMatch){
	return res.status(400).send({msg:"Wrong Password"})
}

const accessToken= jwt.generateAccessToken(user._id)
const refreshToken= jwt.generateRefreshToken(user._id)

// console.log(accessToken,refreshToken)
// res.cookie('accessToken',accessToken)
res.cookie('refreshToken',refreshToken,)
res.send({accessToken,refreshToken})



	} catch (error) {
		console.log(error.message)
		res.status(500).send({msg:"Internal Error"})
	}
	
	}

const logout= async(req,res)=>{

try {

	const {accessToken,refreshToken}= req.cookies;
  blacklist.addToBlacklist(accessToken);
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')

  res.send({msg:"Logout Successfully"})
	


} catch (error) {
	res.status(500).send({msg:"Internal Error"},error.message)
}
		
}

module.exports={signup,login,logout}