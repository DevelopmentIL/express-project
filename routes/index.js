var express = require('express');
var router = express.Router();

router.prefix = '/';
router.viewpath = 'index/';

router.get('/', function(req, res, next) {
	res.render(router.viewpath + 'index', {
		// some view parameters here...
	});
});

module.exports = router;
