var debug = require('debug')('oa-service');

function Feather (store) {
  debug("constructor", store);
  
  // call new constructor if not already
  if (!(this instanceof Feather)) {
    return new Feather(store);
  }

  this.store = store;
  this.name = store.name;
};

Feather.prototype.setup = function (app) {
  debug("setup", app);
  this.app = app;
};

Feather.prototype.find = function (params) {
  params = params || {};
  return this.store.find(params)
  ;
};

Feather.prototype.get = function (id, params) {
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

Feather.prototype.create = function (body, params) {
  debug("create", body, params);
  params = params || {};

  return this.store.create(body)
  ;
},

Feather.prototype.update = function (id, body, params) {
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

Feather.prototype.remove = function (id, params) {
  debug("remove", id, params);
  params = params || {};

  return this.store.remove(id)
  ;
};

module.exports = Feather;
