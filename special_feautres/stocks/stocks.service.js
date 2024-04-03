const Stock = require('../../model/stock');
const Product = require('../../model/products');

async function createStockForOutlets(outlets) {
    try {
        const stocks = [];
        for (const outlet of outlets) {
            const stockItems = [];
            // Fetch all products
            const products = await Product.find();
            // Populate stockItems with product details
            for (const product of products) {
                stockItems.push({
                    product: product._id,
                    unit: 0, // default unit
                    cases: 0 // default cases
                });
            }
            const newStock = new Stock({
                outletId: outlet._id,
                stock: stockItems
            });
            await newStock.save();
            stocks.push(newStock);
        }
        return stocks;
    } catch (error) {
        throw error;
    }
}

async function updateStockForProduct(outletId, productId, unit, cases) {
    try {
        const stock = await Stock.findOne({ outletId });
        if (!stock) {
            throw new Error('Stock not found for the given outlet');
        }
        const productIndex = stock.stock.findIndex(item => String(item.product) === String(productId));
        if (productIndex === -1) {
            throw new Error('Product not found in stock');
        }
        stock.stock[productIndex].unit = unit;
        stock.stock[productIndex].cases = cases;
        await stock.save();
        return stock;
    } catch (error) {
        throw error;
    }
}

// Service to get stock information for a specific outlet
async function getStockForOutlet(outletId) {
    try {
        const stock = await Stock.findById(outletId).populate('stock.product');
        if (!stock) {
            throw new Error('Stock not found for the given outlet');
        }
        return stock;
    } catch (error) {
        throw error;
    }
}
async function updateAllStocks(outletId, updatedStockItems) {
    try {
        const stock = await Stock.findOne( {outletId} );
        console.log("stock", stock)
        if (!stock) {
            throw new Error('Stock not found for the given outlet');
        }
        // Update each stock item with new values
        updatedStockItems.forEach(updatedItem => {
            const existingItem = stock.stock.find(item => String(item.product) === String(updatedItem.productId));
            if (existingItem) {
                existingItem.unit = updatedItem.unit;
                existingItem.cases = updatedItem.cases;
            }
        });
        await stock.save();
        return stock;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createStockForOutlets,
    updateStockForProduct,
    getStockForOutlet,
    updateAllStocks
};