var Promise = require('bluebird');
var seneca = require('seneca')()
  .client();

var act = Promise.promisify(seneca.act, {context: seneca});

module.exports = function(resource, model) {
  var router = require('express').Router();

  router.route('/' + resource)
    .get(function(req, res, next) {
      console.log('find all ' + model);
      var page = req.query._page;
      var perPage = req.query._perPage;
      var sortField = req.query._sortField;
      var sortDir = req.query._sortDir;
      var filters = req.query._filters;

      var offset = (page - 1) * perPage;
      var limit = perPage;
      var col = sortField;
      var sort = sortDir;
      var filters = filters;

      act('role:mongoose-entity, cmd:find-all', {
        model, filters,
        limit, offset,
        col, sort
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

      act('role:mongoose-entity, cmd:find-by-id', {model, id})
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    })
    .put(function(req, res, next) {
      var id = req.params.id;
      var data = req.body;

      act('role:mongoose-entity, cmd:update-by-id', {model, id, data})
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    })
    .delete(function(req, res, next) {
      var id = req.params.id;

      act('role:mongoose-entity, cmd:destroy-by-id', {model, id})
        .then(function(entity) {
          res.json(entity)
        })
        .catch(next);
    });

  return router;
};
