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

UserSchema.methods = {
    toClient: function() {
        return {
            id: this._id,
            name: this.name,
            email: this.email,
            username: this.username,
            provider: this.provider,
            provider_id: this.provider_id
        };
    }
};

module.exports = mongoose.model('User', UserSchema);