var express = require('express');
var router = express.Router();

router.prefix = '/';

router.get('/', function(req, res, next) {
	res.render('index', {
		// some view parameters here...
	});
});

module.exports = router;
