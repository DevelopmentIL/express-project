var _ = require('underscore');
var mailer = require('express-mailer');
var registry = require('../registry');

mailer.extend(registry.app, registry.config.mailer);
	
exports.send = function(sendOptions, data, callback) {
	data = _.extend({
		config: registry.config,
		prefix: 'http://' + registry.config.domain
	}, data);
	
	if(typeof sendOptions === 'string') {
		sendOptions = {
			template: sendOptions
		};
	}
	
	if(data.from)
		sendOptions.from = data.from;
	
	if(data.replyTo)
		sendOptions.replyTo = data.replyTo;
	
	if(!callback) {
		callback = function(err) {
			if(err)
				registry.logger.warn(err.message, err);
		};
	}
	
	registry.app.mailer.send(sendOptions, data, function(err) {
		var cb = callback;
		
		// prevent multiple calling
		callback = _.noop;
		cb(err);
	});
};


/*** local helpers ***/
		
//function escapeEmail(email, name) {
//	if(!name)
//		return email;
//	
//	name = name
//			.replace(/\s+/, ' ')
//			.replace('"', '\'')
//			.replace('<', '[')
//			.replace('>', ']');
//		
//	return '"' + name + '" <' + email + '>';
//}