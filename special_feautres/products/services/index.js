const Product = require('../../../model/products')

const createProduct = async function (req, res) {
    try {
        const orderid = await Product.find().sort({ "productId": -1 }).limit(1);
        var id;
        if (orderid.length == 0) {
            id = 1;
        } else {
            id = orderid[0].orderId + 1;
        }
        
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports ={
    createProduct
}

