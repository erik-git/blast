var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
  name:String,
  password:String,
  token:String,
  phonenumber:String,
  pinned: [String],
  upvoted: [String],
  downvoted: [String]
}, {collection: 'users' });

module.exports = mongoose.model('Users', userSchema);