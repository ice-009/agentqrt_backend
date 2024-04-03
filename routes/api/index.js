const router = require('express').Router()
const outletRoute = require('../../outlets/routes/outlet.routes')
const orderRoute = require('../../special_feautres/order/routes/index')
const employeeRoute = require('../../users/routes/api/employee.routes')
const reportRoute = require('../../admin/routes/api/report.routes')
const beatRoute = require('../../special_feautres/beat/routes/beat')
const targetRoute = require('../../special_feautres/target/routes/target.routes')
const productRoute = require('../../special_feautres/products/routes/index')
const stockRoute = require('../../special_feautres/stocks/stocks.routes')

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
    {
      path:'/target',
      route:targetRoute
    },
    {
        path: '/product',
        route:productRoute
    },
    {
        path: '/stock',
        route: stockRoute
    }

  ];

    defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
    });
    
    module.exports = router;
  