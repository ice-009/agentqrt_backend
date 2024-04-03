const { createStockForOutlets, updateStockForProduct, getStockForOutlet, updateAllStocks } = require('./stocks.service');

// Controller to add stock for an outlet
async function addStockContr(req, res) {
    const { outletId, stockItems } = req.body;
    try {
        const newStock = await createStockForOutlets(outletId, stockItems);
        res.status(201).json(newStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller to update stock for a product in an outlet
async function updateStockContr(req, res) {
    const { outletId, productId } = req.params;
    const { unit, cases } = req.body;
    try {
        const updatedStock = await updateStockForProduct(outletId, productId, unit, cases);
        res.json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller to get stock for an outlet
async function getStockContr(req, res) {
    const { outletId } = req.params;
    try {
        const stock = await getStockForOutlet(outletId);
        res.json(stock);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function updateAllStocksContr(req, res) {
    const { outletId } = req.params;
    const {  updatedStockItems } = req.body;
    try {
        const updatedStock = await updateAllStocks(outletId, updatedStockItems);
        res.json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    addStockContr,
    updateStockContr,
    getStockContr,
    updateAllStocksContr
};
