const router = require('express').Router()
const adminRoute = require('../../admin/routes/web/admin.routes')
const adminUserRoute = require('../../admin/routes/web/user.routes')
const adminOrganizationRoute = require('../../admin/routes/web/organization.routes')
const adminZoneRoute = require("../../admin/routes/web/zone.routes")
const adminDistributorRoute = require("../../admin/routes/web/distributor.routes")
const adminWarehouseRoute = require("../../admin/routes/web/warehouse.routes")

const defaultRoutes = [
    {
      path:'/admin',
      route:adminRoute
    },
    {
      path:'/admin/user',
      route:adminUserRoute
    },
    {
      path:'/admin/organization',
      route:adminOrganizationRoute
    },
    {
      path:"/admin/zone",
      route:adminZoneRoute
    },
    {
      path:"/admin/distributor",
      route:adminDistributorRoute
    },
    {
      path:"/admin/warehouse",
      route:adminWarehouseRoute
    }
  ]




defaultRoutes.forEach((route) => {
router.use(route.path, route.route);
});

module.exports = router;
  