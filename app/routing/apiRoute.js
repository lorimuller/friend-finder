// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API routes
module.exports = function (app) {
	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});
	console.log("these are friend ", friends);

	// Add new friend entry
	app.post('/api/friends', function (req, res) {
		var userInput = req.body;

		console.log("these are input ", userInput);

		var userResponses = userInput.scores;

		console.log("these are responses " + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var difference = 100;

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {

			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			if (diff < difference) {
				console.log('Closest match found = ' + diff);
				console.log('Friend name = ' + friends[i].name);
				console.log('Friend image = ' + friends[i].photo);

				difference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });
	});
};
