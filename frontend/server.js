var express = require('express');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var next = require('next')
var puppeteer = require('puppeteer')

//Frontend variables
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var port = 3000;
var dev = true;
var redirect_uri = "http://localhost:3000/callback"
var stateKey = "spotify_auth_state";

//Puppeteer variables
const dashboard_url = 'https://developer.spotify.com/dashboard/3396197e1137496bb77ceaa11b0d4a50/users'
const spotify_username = process.env.SPOTIFY_USERNAME;
const spotify_password = process.env.SPOTIFY_PASSWORD;
var browser = null;

//Function to generate a random string for the 'state' parameter, which improves security
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var checkToken = function(req, responseHandler) {
  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + req.cookies['spotify_token'] },
    json: true
  };
  request.get(options, function(error, response, body) {
    if(error){
      console.error('Error checking token: ', error);
      res.redirect('/unexpected-error');
    }else{
      responseHandler(response);
    }
    
  });
}

var spotifyApiRequest = function(url, req, res){
  var options = {
    url: url,
    headers: { 'Authorization': 'Bearer ' + req.cookies['spotify_token'] },
    json: true
  };
  request.get(options, function(error, response, body) {
    if(error){
      console.error('Error checking token: ', error);
      res.status(500).send({ error: 'Failed to fetch data from Spotify API' })
    }else{
      res.status(response.statusCode).send(body);
    }
  });
}

async function addSpotifyUser(email){
  //Open browser
  if(browser === null){
    browser = await puppeteer.launch({headless:true});
  }
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1024});

  //Login if redirected
  await page.goto(dashboard_url);
  try{
    await page.locator('.Button-sc-1dqy6lx-0').setTimeout(3000).click();
    await page.locator('#login-username').fill(spotify_username);
    await page.locator('#login-password').fill(spotify_password);
    await page.locator('.ButtonInner-sc-14ud5tc-0').click();
    await page.waitForNavigation();
    await page.goto(dashboard_url);
  }catch{
  } 
  //Delete first user if necessary
  try{
    await page.locator('#name').setTimeout(3000).click();
  }catch{
    await page.locator(".sc-3bd49785-0 >>> button").setTimeout(3000).click();
    await page.locator('.Link-sc-1v366a6-0').setTimeout(3000).click();
  }
  //Add new user
  await page.locator('#name').fill(email);
  await page.locator('#email').fill(email);
  await page.locator('.ButtonInner-sc-14ud5tc-0').click();
  await new Promise(resolve=>{setTimeout(resolve, 2000)});
  await page.close();
}


var app = next({dev : dev});
const handle = app.getRequestHandler();
//Start Next app
app.prepare().then( () => {
  var server = express();
  server.use(cors());
  server.use(cookieParser());
  server.use(express.json());

  //Endpoints

  //Redirect to Spotify authenticator with parameters
  server.get('/login', function(req, res) {
    var state = generateRandomString(16);
    
    res.cookie(stateKey, state);
    var scope = 'user-read-private user-read-email streaming user-modify-playback-state';
    
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  //For requesting an access token
  server.get('/callback', function(req, res) {
    //Get token based on code
    var code = req.query.code || null;
    var state = req.query.state || null;

    //Check state
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      console.log("State mismatch.")
      res.redirect('/');
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.cookie('spotify_token', body.access_token, {
            httpOnly: true,
            secure: true
          });

          res.redirect('/play');
        } else {
          console.log(response.statusCode)
          res.redirect('/unexpected-error');
        }
      });
    }
  });

  server.get('/play', (req, res) => {
    // use the access token to access the Spotify Web API
    
    checkToken(req, (response) => {
      //Note, methods like redirect end the http response of the res object and should not be called more than once on the same object
      //Handle
      if(response.statusCode === 200){
        return handle(req, res);
      //User not added
      }else if(response.statusCode === 403){
        res.redirect('/unregistered-user');
      //Invalid token
      }else if(response.statusCode === 401){
        console.log("Invalid token.")
        res.redirect('/');
      }else{
        res.redirect('/unexpected-error');
      }
    });
    
  });


  server.get("/unregistered-user", (req, res)=>{
    //Attempt request
    checkToken(req, (response) => {
      if(response.statusCode === 403){
        return handle(req, res);
      }else{
        res.redirect('/play?' +
          querystring.stringify({
            signed_in: true
          }));
      }
    });
  });

  server.put("/add-user", (req, res) => {
    var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + req.cookies['spotify_token'] },
      json: true
    };
    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200){
        res.status(200).send("OK");
      }else if(!error && response.statusCode === 403){
        addSpotifyUser(req.body.email).then(
          ()=>{
            request.get(options, function(error, response, body) {
              if(!error && response.statusCode === 200){
                res.status(200).send("OK");
              }else{
                res.status(500).send("Something went wrong.");
              }
            });
          }
        );
      }else{
        res.status(500).send("Invalid email.");
      }
    });
  });

  server.get("/spotify-search", (req, res) => {
    spotifyApiRequest('https://api.spotify.com/v1/search?'+querystring.stringify({q : req.query.q, type : "track", limit:10}), req, res);
  });

  server.get("/spotify-audio-analysis", (req, res) => {
    spotifyApiRequest('https://api.spotify.com/v1/audio-analysis/'+req.cookies['track_id'], req, res);
  });

  server.get("/spotify-token", (req, res) => {
    res.json({token : req.cookies['spotify_token']});
  });

  server.put("/start-webplayer", (req, res) => {
    url = `https://api.spotify.com/v1/me/player/play?device_id=${req.query.device_id}`;
    body = {uris: ["spotify:track:"+req.cookies['track_id']]};
    
    var options = {
      url: url,
      body : body,
      headers: { 'Authorization': 'Bearer ' + req.cookies['spotify_token'] },
      json: true
    };
    request.put(options, function(error, response, body) {
      if(error){
        console.error('Error starting playback: ', error);
        res.status(500).send({ error: 'Failed to fetch data from Spotify API' })
      }else{
        res.status(response.statusCode).send(body);
      }
    });
    
  });

  server.put("/track-id", (req, res) => {
    res.cookie('track_id', req.body.track_id, {
      httpOnly: true,
      secure: true
    });
    res.status(201).json({ message : 'success'});
  });


  server.all("*", (req, res) => {
    return handle(req, res);
  });

  //Start server
  console.log(`Listening on ${port}`);
  server.listen(port);
});


