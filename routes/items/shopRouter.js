var express = require('express');
const bodyParser = require('body-parser');

var Shops = require('../../models/shop');
var User = require('../../models/user');

var authenticate = require('../../authenticate');
const cors = require('../cors');

var shopRouter = express.Router();
shopRouter.use(bodyParser.json());

shopRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Shops.find(req.query)
    .then((Shop) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Shop);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    req.body.request=[];
    Shops.create(req.body)
    .then((shop) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shop);
    }, (err) => next(err))
    .catch((err) => next(err));
});

shopRouter.route('/user')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    
    User.findOne({_id:req.body.id})
    .then((user) => {
        if(user){
        user.shop=req.body.shop;
        user.admin=true;
        user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
              return ;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Shop added to user account'});
            
          });
        }
        else{
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({success:false});
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
shopRouter.route('/user/request')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
 
    Shops.findById(req.body.shop)
    .then((Shop) => {
        Shop.request.push(req.body);
        Shop.save()
        .then((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
              return ;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Your ORDER REQUESTED'});
            
          })
    }, (err) => next(err))
    .catch((err) => next(err));
 

})
module.exports = shopRouter;
