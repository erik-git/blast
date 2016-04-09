var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var followSchema = new Schema({
  userID: String,
  blastID: String
}, {collection: 'follows' });

module.exports = mongoose.model('Follows', followSchema);