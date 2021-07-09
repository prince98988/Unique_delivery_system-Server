const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var item =new Schema({
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category:{
      type: String,
      required: true
    },
    unit:{
        type: String,
        required: true
    }
  })
const shopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    unique:{
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    request:[item]
    
}, {
    timestamps: true,
    usePushEach: true
});

var shop = mongoose.model('shop', shopSchema);

module.exports = shop;

//schema for add item category, features