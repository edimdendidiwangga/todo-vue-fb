const router = require('express').Router();

router.get('/', function(req, res){
	// let nameUser = req.body.name;
	// let emailUser = req.body.email;
	// let dataResult = req.body.dataResult;
	let nameUser = 'edim';
	let emailUser = 'edimdendy@gmail.com';
	let dataResult = 'test from cron job';
	var api_key = 'key-06f7f089efacb7cce55e79eaed063b43';
	var domain = 'sandboxdc8d329f2cc44c62b42a0b13f715abb6.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
		var data = {
		from: 'Edim <edimdendi@gmail.com>',
		to: emailUser,
		subject: 'Todo Apps',
		text: dataResult
	};
	mailgun.messages().send(data, function (error, result) {
		console.log(result)
	});
})

module.exports = router;
