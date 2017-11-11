var path = require("path");
// import friends list
var friends= require("../data/friends.js");

module.exports = function(app) {
  //total list of friends
  app.get('/api/friends', function(req, res) {
  		res.json(friends);
  	});

    //add new friend
    app.post("/api/friends", function(req, res) {
      //capture user input
      var userInput = req.body;
      console.log('userInput = ' + JSON.stringify(userInput));
      var userResponse = userInput.score;
      console.log('userResponse = ' + userResponse);

      //matching best friend
      var matchName = "";
      var matchImage = "";
      var totalDiffer = 10000;  //Make the initial value big for comparison

      // Examine all existing friends in the list
      for(var i=0; i < friends.length; i++){
        // Compute differenes for each question
        var differ = 0;
        for(var j=0; j < userResponse.length; j++){
          differ += Math.abs(friends[i].score[j] - userResponse[j]); //function returns the absolute value of a number
        }
        if (differ < totalDiffer) {
          totalDiffer = differ;
          matchName = friends[i].name;
          matchImage = friends[i].photo;

        }
      }
      //add a new user
      friends.push(userInput);
 //send response
      res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};
