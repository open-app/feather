var _ = require('lodash');

module.exports = function (types) {
  return function (req, res) {

    var data = req.data;
    var type = types.get(data['@type']);

    res.format({
      'application/json': function () {
        return data;
      },
    });
  };
};
