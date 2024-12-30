const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passHash: { type: String, required: true },
  QR: { type: String }, 
  Lists: {
    type: Map, 
    of: [String], 
        default: {}
  }
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
