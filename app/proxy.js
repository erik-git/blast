var request = require('request');

exports.getData = function(req, res){
	request(req.query.urlstring, function(err,response, body){
		res.send(response.body);
	});
}