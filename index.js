var debug = require('debug')('oa-service');

function Service (store) {
  debug("constructor", store);
  
  // call new constructor if not already
  if (!(this instanceof Service)) {
    return new Service(store);
  }

  this.store = store;
  this.name = store.name;
};

Service.prototype.setup = function (app) {
  debug("setup", app);
  this.app = app;
};

Service.prototype.find = function (params) {
  params = params || {};
  return this.store.find(params)
  ;
};

Service.prototype.get = function (id, params) {
  debug("get", id, params);
  params = params || {};

  return this.store.get(id, params)
  .bind(this)
  .then(function (data) {
    if (!data) {
      throw new this.app.errors.NotFound(id+' does not exist');
    }
    return data;
  })
  ;
};

Service.prototype.create = function (body, params) {
  debug("create", body, params);
  params = params || {};

  return this.store.create(body)
  ;
},

Service.prototype.update = function (id, body, params) {
  debug("update", id, body, params);
  params = params || {};

  if (body.id && (body.id !== id)) {
    throw new this.app.errors.BadRequest(
      "id in path ("+id+") did not match"+
      "id in body ("+body.id+")."
    );
  } else {
    body.id = id;
  }

  return this.store.update(body)
  ;
};

Service.prototype.remove = function (id, params) {
  debug("remove", id, params);
  params = params || {};

  return this.store.remove(id)
  ;
};

module.exports = Service;
