const {getOutletPage, orderReportService} =  require('../service/outlet');

const getOutletPageContr = async function(req,res){
    const outlet = await getOutletPage(req.params.id);
    console.log("out",outlet);
    res.render('admin/outlet/home',{outlet})
}

const getOrderReportContr = async function(req,res){
    const order = await orderReportService(req.params.id);
    console.log(order)
    res.render('admin/outlet/order',{order})
    // res.send(order);

}
module.exports = {
    getOutletPageContr,
    getOrderReportContr
}