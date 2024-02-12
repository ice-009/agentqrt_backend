const {createProduct, getProductbyId, getAllProducts} = require('../services/index')

const createProductController = async(req,res)=>{
    try{
        const product = req.body;
        const newProduct = await createProduct(product);
        // console.log(newProduct);
        res.json({
            newProduct
        })
    }
    catch(err){
        // throw new Error(err)
        console.log(err)
    }
}
const getProductbyIdController = async(req,res)=>{
    try{
        const productId = req.params.productId;
        const product = await getProductbyId(productId);
        res.json({
            product
        })
    }
    catch(err){
        console.log(err)
    }
}

const getAllProductsController = async(req,res)=>{
    try{
        const products = await getAllProducts();
        res.json({
            products
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    createProductController,
    getProductbyIdController,
    getAllProductsController
}