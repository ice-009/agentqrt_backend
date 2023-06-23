const router = require('express').Router()
const outletRoute = require('./outlet.routes')
const orderRoute = require('./order.routes')
const adminRoute = require('./admin.routes')
const employeeRoute = require('./employee.routes')

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
      path:'/admin',
      route:adminRoute
    },
    {
      path:'/employee',
      route:employeeRoute
    }

  ];

    defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
    });
    
    module.exports = router;
  