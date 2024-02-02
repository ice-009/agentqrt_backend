const {getOutletPage} =  require('../service/outlet');

const getOutletPageContr = async function(req,res){
    const outlet = await getOutletPage(req.params.id);
    console.log("out",outlet);
    res.render('admin/outlet/home',{outlet})
}

module.exports = {
    getOutletPageContr
}