var _ = require('underscore');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var winston = require('winston');
var expressWinston  = require('express-winston');
//var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var expressValidator = require('express-validator');
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
//var mailer = require('express-mailer');

var app = module.exports = express();
var config = require('./config/' + app.get('env'));
var validators = require('./helpers/validators');
var locals = require('./helpers/locals');

//mongoose.connect(config.mongodb);

//mailer.extend(app, config.mailer);


// Winston logger
winston.remove(winston.transports.Console);
winston.exitOnError = function(err) {
	return (err.code !== 'EPIPE');
};
app.set('logger', winston);
app.logger = winston;

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


// Add all your routers names here:
var routes = [
	'index'
];

app.set('config', config);
app.locals.siteName = config.name;
app.locals.helpers = locals;

//app.enable('trust proxy');
//app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(expressWinston.logger({
	winstonInstance: winston,
	meta: false,
	expressFormat: true
}));

// domain redirection
app.use(function(req, res, next) {
	if(req.hostname === config.domain)
		return next();
	
	res.redirect(req.protocol + '://' + config.domain + req.originalUrl);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator({
//	customValidators: validators
//}));

app.use(cookieParser(config.secret, config.cookie));
//app.use(session(_.extend({
//	cookie: config.cookie,
//	secret: config.secret,
//	
//	store: new MongoStore(_.extend({
//		mongooseConnection: mongoose.connection
//	}, config.session.storeOptions))
//}, config.session)));

app.use(express.static(path.join(__dirname, 'public'), config.static));

// add routes
routes.forEach(function(route) {
	route = require('./routes/' + route);
	
	app.use(route.prefix, route);
	route.app = app;
	route.config = config;
});


// error handlers

app.use(expressWinston.errorLogger({
	winstonInstance: winston
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	if(!err.status)
		err.status = 500;
    
	res.status(err.status);
	res.render('error', {
		message: err.message,
		status: err.status,
		method: req.method,
		url: req.url,
		error: (app.get('env') === 'development') ? err : {}
	});
});
