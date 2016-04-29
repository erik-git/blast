var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var blastSchema = new Schema({
  type: Number,
  content: String,
  userID: String,
  imageURL: String,
  created: Date,
  lifetime: Number,
  status: String
}, {collection: 'blasts' });

module.exports = mongoose.model('Blasts', blastSchema);