const express= require("express")
const router= express.Router()

const productController= require("../controllers/productController")
const authMiddleware= require("../middleware/authMiddleware")

router.get("/products",authMiddleware.authenticaterUser,productController.getProducts)
router.post("addproduct",authMiddleware.authenticaterUser,authMiddleware.authenticaterSeller,productController.addProduct)

router.delete("/deleteproduct/:id",authMiddleware.authenticaterUser,authMiddleware.authenticaterSeller,productController.deleteProduct)


module.exports=router;