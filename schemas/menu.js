const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  text: { type: String, required: true },
  URL: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'menu', default: null }
});

module.exports = mongoose.model('menu', menuSchema);
