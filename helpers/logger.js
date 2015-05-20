var _ = require('underscore');
var winston = require('winston');
var registry = require('../registry');
var config = registry.config;

// Winston logger
winston.remove(winston.transports.Console);
winston.exitOnError = function(err) {
	return (err.code !== 'EPIPE');
};

if(config.logger.console) {
	winston.add(winston.transports.Console, _.extend({
		colorize: true,
		prettyPrint: true,
		depth: 20,
		handleExceptions: true
	}, config.logger.console));
}

if(config.logger.access) {
	winston.add(winston.transports.DailyRotateFile, _.extend({
		name: 'access-file',
		handleExceptions: true,
		maxsize: 10 * 1024 * 1024,
		maxFiles: 14
	}, config.logger.access));
}

if(config.logger.error) {
	winston.add(winston.transports.DailyRotateFile, _.extend({
		name: 'error-file',
		level: 'warn',
		handleExceptions: true,
		maxsize: 10 * 1024 * 1024,
		maxFiles: 14
	}, config.logger.error));
}

module.exports = winston;

