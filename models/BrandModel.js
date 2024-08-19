var mongoose = require('mongoose');
var BrandSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      country: String
   });
var BrandModel = mongoose.model('brands', BrandSchema);
module.exports = BrandModel;