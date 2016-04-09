//var getJSON = require('get-json');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var moment = require('moment');

var CronJob = require('cron').CronJob;

var dobAlarm = new CronJob({
	cronTime:'00 00 01,03,04,05,07 * * *',
	onTick:function(){
		console.log(new Date())
		//sendPushNotification(users[i].token, 'notification_message' )
	},
	start:true,
	timezone:'Europe/London'
});

dobAlarm.start();

//----APPLE PUSH SERVICES----////////
var apn = require('apn');
process.env['DEBUG'] = 'apn';
var options = {
	production: false,
	gateway: 'gateway.sandbox.push.apple.com',
	cert: 'app/production_cert.pem',
	key: 'app/production_key.pem',
	passphrase: "ramin"
};
var apnConnection = new apn.Connection(options);

function sendPushNotification(tokenId, message){
	var deviceToken = tokenId;
	var myDevice = new apn.Device(deviceToken);
	var note = new apn.Notification();
	note.expiry = Math.floor(Date.now() / 1000) + 7200;// Expires 2 hour from now.
	note.sound = "ping.aiff";
	note.alert = message;
	apnConnection.pushNotification(note, myDevice);
}