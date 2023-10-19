const router = require('express').Router()
const outletRoute = require('./outlet.routes')
const orderRoute = require('./order.routes')
const employeeRoute = require('./employee.routes')
const reportRoute = require('../../admin/routes/api/report.routes')

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
    //Actual part start here for api route
    {
      path:'/report',
      route:reportRoute
    }

  ];

    defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
    });
    
    module.exports = router;
  