const mongoose= require("mongoose")
const productSchema= mongoose.Schema({
	name:{required:true,type:String},
	price:{required:true,type:Number},
	seller:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user',
		required:true
	}
},{
	versionKey:false
})

const Product= mongoose.model("product",productSchema)

module.exports=Product;