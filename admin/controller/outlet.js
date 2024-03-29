const { getOutletPage, orderReportService, createTarget, getActivityService, createTargetService } = require('../service/outlet');
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
    const id = req.params.id;
    res.render('pages/outlet_target_dash.ejs', { id })
}

const createTargetContr = async function (req, res) {
    const target = await createTargetService(req.body, req.params.id);
    const id = req.params.id;
    res.redirect('/api/v1/admin/outlet/target/' + id);
}


// const createTargetContr = async function (req, res) {
//     const target = await createTarget(req.body, req.params.id);
//     const id = req.params.id;
//     // res.send(target);
//     res.redirect('/admin/outlet/' + req.params.id);
// };

const getActiReportContr = async function (req, res) {
    const activities = await getActivityService(req.params.id);
    console.log(activities);
    const id = req.params.id;
    console.log(activities, id)

    res.render('pages/outlet_acti_dash.ejs', { activities, id })
}



module.exports = {
    getOutletPageContr,
    getOrderReportContr,
    getTargetContr,
    createTargetContr,
    getActiReportContr,
}