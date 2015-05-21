var _ = require('underscore');
var config = require('./default');


module.exports = _.extend({}, config, {
//	mongodb: 'mongodb://username:password@localhost/database',

	static: {
		maxAge: 24 * 3600 * 1000
	}
});