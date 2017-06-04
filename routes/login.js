var express = require('express');
var router = express.Router();
var google = require('googleapis');

/* GET home page. */


router.get('/auth', function(req, res, next) {
 var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  'ClientId',
  'ClientSecret',
  'CallbackURL'
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  // Optional property that passes state parameters to redirect URI
  // state: { foo: 'bar' }
});
res.redirect(url);
});


router.get('/oauth2callback',function(req,res,next){
	var code = req.query.code;
	var OAuth2 = google.auth.OAuth2;
  var oauth2Client = new OAuth2(
  'ClientId',
  'ClientSecret',
  'CallbackURL'
);


	oauth2Client.getToken(code, function (err, tokens) {
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if (!err) {
    res.send('success!!!');
  }
  else{
  	res.send("Better luck next time");
  }
});
})
module.exports = router;
