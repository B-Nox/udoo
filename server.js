// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bunyan     = require('bunyan');         // load bunyan

// configure app to use bunyan as logger
var logger = bunyan.createLogger({name: 'ArtworkServer'});

var port = process.env.PORT || 3000;        // set our port

// CONTROLLERS LOAD
// =============================================================================

var artworkCtrl = require('./controllers/artwork');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all request
var commonMiddleware = function (req, res, next) {
    logger.info('Captured ' + req.method + ' request to ' + req.baseUrl + req.url);
    next(); // make sure to go to the next route
};

// DEFINE error middleware
var errorHandler = function (err, req, res, next) {

    // Here we can define different behavior for different type of errors,
    // for example you can parse mongoose validation errors,
    // or define custom HttpStatus,
    // or ...

    res.status(500).send(err);
};

router.use(commonMiddleware);

// define the route for Artworks
router.route('/artworks')
    .get(artworkCtrl.query);

router.route('/artworks/:id')
    .get(artworkCtrl.get);

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({ message: 'The Artworks server api route is working.' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES 
// =============================================================================

app.use(commonMiddleware);

//app.use('/api/images', express.static('public/images'));

//*
var imagesHandler = function (req, res, next) {

  var options = {
      root: __dirname + '/public/images'
  };

  var fileName = req.params.name;
  logger.info('Requested:', fileName);
    
  res.sendFile(fileName, options, function (err) {
    if (err) {
      logger.error(err);
      res.status(err.status).end();
    }
    else {
      logger.info('Sent:', fileName);
    }
  });

};

var audiosHandler = function (req, res, next) {

  var options = {
      root: __dirname + '/public/audios'
  };

  var fileName = req.params.name;
  logger.info('Requested:', fileName);
    
  res.sendFile(fileName, options, function (err) {
    if (err) {
      logger.error(err);
      res.status(err.status).end();
    }
    else {
      logger.info('Sent:', fileName);
    }
  });

};

var videosHandler = function (req, res, next) {

  var options = {
      root: __dirname + '/public/videos'
  };

  var fileName = req.params.name;
  logger.info('Requested:', fileName);
    
  res.sendFile(fileName, options, function (err) {
    if (err) {
      logger.error(err);
      res.status(err.status).end();
    }
    else {
      logger.info('Sent:', fileName);
    }
  });

};

//*/

app.get('/api/images/:name', imagesHandler);
app.get('/api/videos/:name', videosHandler);
app.get('/api/audios/:name', audiosHandler);

// all of our routes will be prefixed with /api
app.use('/api', router);

/*
app.use('/images', express.static('public/images'));
//*/

//*
app.get('/images/:name', imagesHandler);
app.get('/videos/:name', videosHandler);
app.get('/audios/:name', audiosHandler);
//*/

//*
app.use('/', function(req, res) {
    res.json({ message: 'Artworks server is working' });
});
//*/

// ATTACH the error Middleware
// =============================================================================
app.use(errorHandler);

// START THE SERVER
// =============================================================================
var server = app.listen(port, function(){
    logger.info('Magic happens on port ' + port);
});
