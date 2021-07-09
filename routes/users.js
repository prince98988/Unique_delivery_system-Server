var express = require('express');
var passport=require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var User = require('../models/user');
var authenticate = require('../authenticate');
const cors = require('./cors');
var itemSchema = require('../models/item');
const { on } = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());
/* GET users listing. */
router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  User.find({})
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});
router.post('/signup/user',cors.corsWithOptions,(req, res, next) => {
   User.findOne({username:req.body.username})
   .then((user)=>{
        if(user){
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: false, status: 'User exist'});
          return;
        }
        res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'User Not exist'});
   })
   .catch((err)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'User Exists'});
   })
});
router.post('/signup', cors.corsWithOptions,(req, res, next) => {
  User.register(new User({username: req.body.username,mobileNo:req.body.mobileNo}),  req.body.password, 
     (err, user) => {
          if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
          }
          else {
            
            if (req.body.firstname)
              user.firstname = req.body.firstname;
            if (req.body.lastname)
              user.lastname = req.body.lastname;
            user.cart=[];
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return ;
              }
              passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Registration Successful!'});
              });
            });
          }
  });
});


router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {  
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user){
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!',user:user});
    }
    else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, token: token, status: 'You are not  logged in!'});
    }
  })
  .catch((error)=>{
    
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, token: token, status: 'You are not  logged in!'});
  })
});
var cart1=[];
function mapArray(item){

}
router.route('/cart')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser ,(req,res,next) => {
  User.findById(req.user._id)
  .then((user1) => {
      var user =JSON.parse(JSON.stringify(user1));
      
      var cart=[];
      for(let i=0;i<user.cart.length;i++){
        console.log(user.cart[i].category);
        var Items=mongoose.model(user.cart[i].category, itemSchema);
        Items.findById(user.cart[i].item)
        .then((item)=>{
            if(item){
            cart.push(JSON.stringify(item));
            console.log(cart);
            }
        })
      }
      console.log(cart);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({carts:cart});
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    
    User.findById(req.body.user)
    .then((user) => {
        user.cart.push(req.body);
        user.save()
        .then((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
              return ;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'ADD TO CART SUCCESSFULL'});
            
          })
    }, (err) => next(err))
    .catch((err) => next(err));
 

})

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      var userType="Normal"
      if(user.employee==true)userType="Employee";
      else if(user.admin==true)userType="Admin";
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: userType});

    }
  }) (req, res);
});

module.exports = router;