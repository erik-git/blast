var mongoose   = require('mongoose');
//mongoose.connect('mongodb://localhost:27017');
mongoose.connect('mongodb://alex:mongoalex888@ec2-54-175-84-4.compute-1.amazonaws.com:27017/blastDB')

var db = mongoose.connection;
	db.on('error', function(err){
		console.log('BlastDB connection failed with error:', err);
	});
	db.once('open', function(){
		console.log('Connected to BlastDB.');
	})
var users = require('./users.js');
var blasts = require('./blasts.js');
var proxy = require('./proxy.js');
var pushnotification = require('./pushnotification.js');
module.exports = function(router) {

	// ROUTES FOR OUR API
	// =============================================================================

	// middleware to use for all requests
	router.use(function(req, res, next) {
		// do logging
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'Welcome to our Blast server!' });	
	});

	// proxy router
	router.route('/proxy')
		.get(proxy.getData)

	router.route('/user/login')
		.post(users.login);

	router.route('/user/register')
		.post(users.register);

	router.route('/userbyname/:name')
		.get(users.getUserByName);

	router.route('/userbyphone/:phone')
		.get(users.getUserByPhone);

	router.route('/userbyinfo/:name/:phone')
		.get(users.getUserByInfo);

	router.route('/updatepassword/:id')
		.post(users.updatePassword);

	router.route('/user/:id')
		.get(users.getUserById);

	router.route('/user/:id')
		.put(users.updateUserInfoById);

	router.route('/addPinned/:userID/:blastID')
		.post(users.addPinnedBlast);

	router.route('/removePinned/:userID/:blastID')
		.post(users.removePinnedBlast);

	router.route('/addUpvoted/:userID/:blastID')
		.post(users.addUpvotedBlast);

	router.route('/removeUpvoted/:userID/:blastID')
		.post(users.removeUpvotedBlast;

	router.route('/addDownvotedBlast/:userID/:blastID')
		.post(users.addDownvotedBlast);

	router.route('/removeDownvotedBlast/:userID/:blastID')
		.post(users.removeDownvotedBlast);

	router.route('/blast')
		.post(blasts.createBlast);

	router.route('/blasts')
		.get(blasts.getBlasts);

	router.route('/blast/:id')
		.get(blasts.getBlastById);

	router.route('/blast/:id')
		.post(blasts.updateBlastById);

};