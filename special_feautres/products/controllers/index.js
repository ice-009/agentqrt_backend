const {createProduct} = require('../services/index')

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

module.exports={
    createProductController
}