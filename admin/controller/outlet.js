const { getOutletPage, orderReportService, createTarget } = require('../service/outlet');
// const {Employee} = require('../../model/')

const getOutletPageContr = async function (req, res) {
    const id = req.params.id;
    const outlet = await getOutletPage(id);

    // Convert outlet to a plain JavaScript object
    const outletData = outlet.toObject();
    delete outletData.password;
    delete outletData._id;
    res.render('pages/outlet_dash.ejs', { outlet: outletData, id });
};


const getOrderReportContr = async function (req, res) {
    const orders = await orderReportService(req.params.id);
    const id = req.params.id;
    // const
        console.log(orders)
    res.render('pages/outlet_order_dash.ejs', { orders, id })
    // res.send(orders);

}

const getTargetContr = async function (req, res) {
    res.render('admin/outlet/target')
}

const createTargetContr = async function (req, res) {
    const target = await createTarget(req.body, req.params.id);
    const id = req.params.id;
    // res.send(target);
    res.redirect('/admin/outlet/' + req.params.id);
};

module.exports = {
    getOutletPageContr,
    getOrderReportContr,
    getTargetContr,
    createTargetContr
}