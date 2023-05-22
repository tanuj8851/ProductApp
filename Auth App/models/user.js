const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
	userName:{required:true,type:String},
	password:{required:true,type:String},
	role:{required:true,type:String,enum:['seller','buyer'],default:'buyer'}
},{
	versionKey:false
})

const User= mongoose.model("user",userSchema)

module.exports=User;