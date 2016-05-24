var Promise = require('bluebird');

module.exports = function(resource, model, client) {
  var router = require('express').Router();
  var act = Promise.promisify(client.act, {context: client});

  router.route('/' + resource)
    .get(function(req, res, next) {
      console.log('find all ' + model);
      var page = req.query._page;
      var perPage = req.query._perPage;
      var sortField = req.query._sortField;
      var sortDir = req.query._sortDir;
      var filters = req.query._filters;

      var skip = parseInt((page - 1) * perPage);
      var limit = parseInt(perPage);
      var sort = {}; sort[sortField] = sortDir;
      try {filters = JSON.parse(req.query._filters)} catch (err) {}

      act('role:mongoose-entity, cmd:findAll', {
        model, filters, limit, skip, sort
      }).then(function(results) {
        res.header('X-Total-Count', results.count);
        res.json(results.entities);
      }).catch(next)
    })
    .post(function(req, res, next) {
      var data = req.body;

      act('role:mongoose-entity, cmd:create', {model, data})
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    });

  router.route('/' + resource + '/:id')
    .get(function(req, res, next) {
      var id = req.params.id;

      act('role:mongoose-entity, cmd:findById', {model, id})
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    })
    .put(function(req, res, next) {
      var id = req.params.id;
      var data = req.body;

      act('role:mongoose-entity, cmd:updateById', {model, id, data})
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    })
    .delete(function(req, res, next) {
      var id = req.params.id;

      act('role:mongoose-entity, cmd:destroyById', {model, id})
        .then(function(entity) {
          res.json(entity)
        })
        .catch(next);
    });

  return router;
};
