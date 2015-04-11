
// loading database.json

var database = {message:'database.json'};


exports.findById = function(idArtwork) {
    
    var artwork = { id: idArtwork, message:'Artwork'};
    
    return artwork;
};