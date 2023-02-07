const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', function () {
    console.info('Mongoose connection open to ' + process.env.MONGODB_URL);
}).on('error', function (err) {
    console.error('Mongoose connection error: ' + err);
}).on('disconnected', function () {
    console.error('Mongoose connection lost!');
});

module.exports = mongoose;