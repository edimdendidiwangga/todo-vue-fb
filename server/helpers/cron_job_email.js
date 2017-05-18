let CronJob = require('cron').CronJob;
let kue = require('kue'),
    queue = kue.createQueue();
require('dotenv').config();

module.exports = {
  auth: function(req, res, next) {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        next()
      } else {
        res.send('You must login!')
      }
    })
  }
}

var CronJob = require('cron').CronJob;
var kue = require('kue'),
    queue = kue.createQueue();

var job = new CronJob('00 56 14 * * 1-5', function() {
	var data = {
		from: 'Edim <edimdendi@gmail.com>',
		to: 'edimdendy@gmail.com',
		subject: 'Baymax Apps',
		text: 'test from cron job'
	};
  var job = queue.create('email',
		data
	  ).save(function(err) {
	    if (!err) console.log(job.id);
	  });
  },
  null,
  true, /* Start the job right now */
  'Asia/Jakarta' /* Time zone of this job. */
);

queue.process('email', function(output, done) {
    email(output.data, done);
});

function email(data, done) {

	var api_key = 'key-06f7f089efacb7cce55e79eaed063b43';
	var domain = 'sandboxdc8d329f2cc44c62b42a0b13f715abb6.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

	mailgun.messages().send(data, function (error, body) {
		console.log(body)

	});
	done();
}
