const Product= require("../models/Product")

const getProducts= async(req,res)=>{

	try {

const products = await Product.find();
 res.status(200).send({products})

	} catch (error) {
		res.status(500).send({msg:"Product not found"})
	}
}


const addProduct= async(req,res)=>{
	try {
		const {name,price}= req.body

		const seller= req.user._id;

		const product= new Product({name,price,seller})

		await product.save()
		res.send({msg:"Product added Successfully"}).status(200)

	} catch (error) {
		res.send({msg:"Product creation failed"}).status(500)
	}
}

const deleteProduct= async(req,res)=>{
	try {
		
const productId= re.params.id;
 await Product.findByIdAndDelete(productId);

 res.send({msg:"Deleted Successfully"}).status(200)

	} catch (error) {
		res.send({msg:"Product deletion failed"}).status(500)
	}
}
module.exports={getProducts,addProduct,deleteProduct}