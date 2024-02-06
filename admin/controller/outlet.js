const {getOutletPage, orderReportService, createTarget} =  require('../service/outlet');

const getOutletPageContr = async function(req,res){
    const id = req.params.id;
    const outlet = await getOutletPage(req.params.id);
    console.log("out",outlet);
    res.render('admin/outlet/home',{outlet, id})
}

const getOrderReportContr = async function(req,res){
    const orders = await orderReportService(req.params.id);
    const id = req.params.id;
    console.log(orders)
    res.render('admin/outlet/order',{orders,id})
    // res.send(order);

}

const getTargetContr = async function(req,res){
    res.render('admin/outlet/target')
}

const createTargetContr = async function(req,res){
    const target = await createTarget(req.body, req.params.id);
    const id = req.params.id;
    // res.send(target);
    res.redirect('/admin/outlet/'+req.params.id);
};

module.exports = {
    getOutletPageContr,
    getOrderReportContr,
    getTargetContr,
    createTargetContr
}