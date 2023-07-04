const router = require('express').Router()
const adminRoute = require('../../admin/routes/web/admin.routes')

const defaultRoutes = [
    {
      path:'/admin',
      route:adminRoute
    },
  ];

defaultRoutes.forEach((route) => {
router.use(route.path, route.route);
});

module.exports = router;
  