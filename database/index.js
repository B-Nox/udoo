
// loading database.json
var artworks = require('./database.json')


exports.getArtworks = function() {
    return artworks;
};


exports.findById = function(idArtwork) {
    
    var artwork = { id: idArtwork, message:'Artwork'};
    
    var len = artworks.length;
    
    for (var i = 0; i < len; i++) {
        if( artworks[i].id === idArtwork ) {
            return artworks[i]; 
        }
    }
    
    return null;
};