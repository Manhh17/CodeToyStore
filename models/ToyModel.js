var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   name: String,
   description: String,
   price: Number,
   image: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  
   }
});

var ToyModel = mongoose.model('toys', ToySchema);
module.exports = ToyModel;