const {getOutletPage, orderReportService} =  require('../service/outlet');

const getOutletPageContr = async function(req,res){
    const outlet = await getOutletPage(req.params.id);
    console.log("out",outlet);
    res.render('admin/outlet/home',{outlet})
}

const getOrderReportContr = async function(req,res){
    const orders = await orderReportService(req.params.id);
    console.log(orders)
    res.render('admin/outlet/order',{orders})
    // res.send(order);

}
module.exports = {
    getOutletPageContr,
    getOrderReportContr
}