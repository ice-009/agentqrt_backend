const router = require('express').Router()
const adminRoute = require('../../admin/routes/web/admin.routes')
const adminUserRoute = require('../../admin/routes/web/user.routes')
const adminOrganizationRoute = require('../../admin/routes/web/organization.routes')

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
    }
  ];

defaultRoutes.forEach((route) => {
router.use(route.path, route.route);
});

module.exports = router;
  