var router = require('express').Router();
var ResourceRouter = require('./lib/resource-router');

router.use(ResourceRouter('administrators', 'AdministratorAccount'));

router.use(ResourceRouter('roles', 'Role'));

router.use(ResourceRouter('permissions', 'Permission'));

router.use(ResourceRouter('devices', 'Device'));

router.use(ResourceRouter('customers', 'CustomerAccount'));

router.use(ResourceRouter('manufacturers', 'ManufacturerAccount'));

module.exports = router;
