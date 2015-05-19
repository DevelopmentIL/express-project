var FileStreamRotator = require('file-stream-rotator');
var config = require('./default');


module.exports = _.extend({}, config, {
//	mongodb: 'mongodb://username:password@localhost/database',

	logger: {
		format: 'combined',
		stream: FileStreamRotator.getStream({
			filename: './logs/access-%DATE%.log',
			frequency: 'daily',
			verbose: false
		})
	}
});