
// Database configs in db.js

var mongoose = require('mongoose');

// need change the directory!
mongoose.connect(process.env.MONGOLAB_URI|| 'mongodb://localhost:27017/CCSP');

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
});

// Connection established
mongoose.connection.once('open', function () {
  console.log('database connection established');
});

// Require models schema, talk should be 'device'
require('./routes/talk');