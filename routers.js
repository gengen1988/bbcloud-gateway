var router = require('express').Router();
var ResourceRouter = require('./lib/resource-router');
var senecaLib = require('seneca');
var nconf = require('nconf');

var administratorClient = senecaLib()
  .client({port: nconf.get('seneca:administrator:port')});

var manufacturerClient = senecaLib()
  .client({port: nconf.get('seneca:manufacturer:port')});

var deviceClient = senecaLib()
  .client({port: nconf.get('seneca:device:port')});

var customerClient = senecaLib()
  .client({port: nconf.get('seneca:customer:port')});

router.use(ResourceRouter('administrators', 'AdministratorAccount', administratorClient));

router.use(ResourceRouter('roles', 'Role', administratorClient));

router.use(ResourceRouter('permissions', 'Permission', administratorClient));

router.use(ResourceRouter('devices', 'Device', deviceClient));

router.use(ResourceRouter('customers', 'CustomerAccount', customerClient));

router.use(ResourceRouter('manufacturers', 'ManufacturerAccount', manufacturerClient));

module.exports = router;
