const router = require('express').Router()
const outletRoute = require('../../outlets/routes/outlet.routes')
const orderRoute = require('../../special_feautres/order/routes/index')
const employeeRoute = require('../../users/routes/api/employee.routes')
const reportRoute = require('../../admin/routes/api/report.routes')
const beatRoute = require('../../special_feautres/beat/routes/beat')

const defaultRoutes = [
    {
      path: '/outlet',
      route:outletRoute
    },
    {
      path:'/order',
      route:orderRoute
    },
    {
      path:'/employee',
      route:employeeRoute
    },

    {
      path:'/report',
      route:reportRoute
    },

    {
      path:'/beat',
      route:beatRoute
    },

  ];

    defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
    });
    
    module.exports = router;
  