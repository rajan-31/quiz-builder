const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    quizzes: [{
        type: String,
    }]
});

const pluginOptions = {
    usernameField: 'email',
    // usernameLowerCase: true,
}
userSchema.plugin(passportLocalMongoose, pluginOptions);

module.exports = mongoose.model('User', userSchema);