const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    unit: {
        type: String,
        required: true
    },
    parts: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    price: {
        type: String,
        required: true,
        
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },

    
}, {
    timestamps: true,
    usePushEach: true
});



module.exports = itemSchema;