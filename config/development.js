var _ = require('underscore');
var config = require('./default');


module.exports = _.extend({}, config, {
	domain: 'localhost',
	
//	port: 3000,
	
//	mongodb: 'mongodb://localhost/my_project',

	logger: _.extend({}, config.logger, {
		console: {
			level: 'debug'
		},
		access: false
	})
});