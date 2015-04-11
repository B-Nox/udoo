var artworkCtrl = require('../database');

// COMMON FUNCTIONS
// =============================================================================




// ARTWORKS exported functions
// =============================================================================

// QUERYING ARTWORKS
// =============================================================================
exports.query = function(req, res, next){

    var artworks = {message:'This route does not provide data.'};
    
    //sending the response
    res.status(200).send(artworks);
};

// QUERYING ONE ARTWORK
// =============================================================================
exports.get = function(req, res, next){

    //var artwork = { id: req.params.id, message:'Artwork'};
    
    var artwork = artworkCtrl.findById(req.params.id);
    
    //sending the response
    res.status(200).send(artwork);
    
};