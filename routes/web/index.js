const router = require('express').Router()
const adminRoute = require('../../admin/routes/web/admin.routes')
const adminUserRoute = require('../../admin/routes/web/user.routes')
const adminOrganizationRoute = require('../../admin/routes/web/organization.routes')
const adminZoneRoute = require("../../admin/routes/web/zone.routes")
const adminDistributorRoute = require("../../admin/routes/web/distributor.routes")
const adminWarehouseRoute = require("../../admin/routes/web/warehouse.routes")
const distributorRoute = require('../../distributor/routes/web/auth.routes')
const organizationRoute = require("../../organization/routes/web/auth.routes")

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
    },
    {
      path:"/distributor",
      route:distributorRoute
    },
    {
      path:"/organization",
      route:organizationRoute
    }
  ]




defaultRoutes.forEach((route) => {
router.use(route.path, route.route);
});

module.exports = router;


// "@emotion/react": "^11.11.1",
//     "@emotion/styled": "^11.11.0",
//     "@mui/icons-material": "^5.14.1",
//     "@mui/material": "^5.14.1",
//     "@mui/x-data-grid": "^6.10.0",
//     "@nivo/bar": "^0.83.0",
//     "@nivo/core": "^0.83.0",
//     "@nivo/geo": "^0.83.0",
//     "@nivo/pie": "^0.83.0",
//     "@reduxjs/toolkit": "^1.9.5",
//     "react-datepicker": "^4.16.0",
//     "react-redux": "^8.1.1",
//     "react-router-dom": "^6.14.2"
  