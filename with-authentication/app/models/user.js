var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    user_image: String,
    provider_id: String,
    facebook: { },
    createdAt: { type: Date, 'default': Date.now }
});
/*
UserSchema.methods.toObject = function() {
  return { name: this.name };
};*/

module.exports = mongoose.model('User', UserSchema);