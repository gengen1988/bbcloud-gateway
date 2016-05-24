var router = require('express').Router();
var ResourceRouter = require('./lib/resource-router');

router.use(ResourceRouter('administrators'));

router.use(ResourceRouter('roles'));

router.use(ResourceRouter('permissions'));

router.use(ResourceRouter('devices'));

router.use(ResourceRouter('customers'));

router.use(ResourceRouter('manufacturers'));

module.exports = router;
