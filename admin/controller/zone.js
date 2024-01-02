const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const adminZoneService = require("../service/zone");
const adminDistWareService = require("../service/dis_ware");
const ZoneModel = require("../../model/zone");
const mongoose = require('mongoose')
const {OrganizationModel} = require("../../model/organization");
const createDistributor = catchAsync(async (req, res) => {
  try {
    await adminZoneService.createDistributor(req.params.id, req.body);
    res.status(200).json({ message: 'Distributor created successfully' });
  } catch (error) {
    console.error('Error creating distributor:', error);

    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred while creating the distributor.' });
    }
  }
});

const createWareHouse = catchAsync(async (req, res) => {
  try {
    await adminZoneService.createWarehouse(req.params.id, req.body);
    res.status(200).json({ message: 'Warehouse created successfully' });
  } catch (error) {
    console.error('Error creating warehouse:', error);
    res.status(500).json({ error: 'An error occurred while creating the warehouse.' });
  }
});

const createZone = catchAsync(async (req, res) => {
  try {
    const { zoneId, name, pincode, district, parentId, distributor, warehouse, organization } = req.body;
    const organizationId = mongoose.Types.ObjectId(organization);
    // Create a new zone in the database using your model (ZoneModel)
    const newZone = new ZoneModel({
      zoneId,
      name,
      pincode,
      district,
      parentId,
      distributor,
      warehouse,
      organization: organizationId // Assuming organization is the ObjectId of the associated organization
    });

    const savedZone = await newZone.save();

    // Add the new zone's zoneId to the listzone array of the corresponding organization
    await OrganizationModel.findByIdAndUpdate(
      organizationId,
      { $push: { listzone: savedZone._id } },
      { new: true }
    );

    res.status(201).json(savedZone);
  } catch (err) {
    console.error('Error creating zone:', err);
    res.status(500).json({ error: 'An error occurred while creating the zone.' });
  }
});



const homeZone = catchAsync(async (req, res) => {
  // const zone = await adminZoneService.getByZoneIdname(req.params.id);
  // const listdistributor = await adminDistWareService.getAllDistributorIdAndName(req.params.id);
  // const listwarehouse = await adminDistWareService.getAllWarehouseIdAndName(req.params.id);

  // Render the view (ensure that the view path is correct)
  res.render("zones/postzone");
});

module.exports = {
  createDistributor,
  createWareHouse,
  createZone,
  homeZone,
};
