const Product = require('../../../model/products')

const createProduct = async function (productBody) {
    try {
        const orderid = await Product.find().sort({ "productId": -1 }).limit(1);
        var id;
        if (orderid.length == 0) {
            id = 1;
        } else {
            id = orderid[0].orderId + 1;
        }

        return Product.create({
            productId: id,
            name: productBody.name,
            price: productBody.price,
            category: productBody.category,
            unit: productBody.unit,
            cases: productBody.cases,
          });
    } catch (error) {
        // res.status(500).json({ error: error.message });
        console.log(error)
    }
}

const getProductbyId = async function (productId) {
    try {
        return Product.findOne({productId: productId});
    }
    catch (error) {
        console.log(error)
    } 
}

const getAllProducts = async function () {
    try {
        return Product.find();
    }
    catch (error) {
        console.log(error)
    } 
}

module.exports = {
    createProduct,
    getProductbyId,
    getAllProducts
}

