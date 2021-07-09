var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var item =new Schema({
  category:{
    type: String,
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId
  }
})
var User = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      mobileNo:{
          type: Number,
          required: true
      },
      cart:[item],
      employee:{
        type: Boolean,
        default: false
      },
      facebookId:{
        type:String,
        default:''
      } ,
      shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
      },
     admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);