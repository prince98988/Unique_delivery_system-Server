const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    image:{
        type: String,
        required: true,
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
}, {
    timestamps: true,
    usePushEach: true
});



module.exports = mongoose.model('Notice', itemSchema);