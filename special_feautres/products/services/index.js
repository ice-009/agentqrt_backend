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
            category: productBody.category
          });
    } catch (error) {
        // res.status(500).json({ error: error.message });
        console.log(error)
    }
}

module.exports = {
    createProduct
}

