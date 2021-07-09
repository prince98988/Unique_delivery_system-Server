var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var itemSchema = require('../../models/item');
var authenticate = require('../../authenticate');
const cors = require('../cors');
const { match } = require('assert');

var itemRouter = express.Router();
itemRouter.use(bodyParser.json());

itemRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    req.body.user=req.user._id;
    var Items=mongoose.model(req.body.category, itemSchema);
    Items.create(req.body)
    .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(item);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    var Items=mongoose.model(req.body.category, itemSchema);
    
    Items.findByIdAndUpdate(req.body._id, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
   
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Items.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

itemRouter.route('/:category')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
  var Items=mongoose.model(req.params.category, itemSchema);
  Items.find({})
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
  var Items=mongoose.model(req.params.category, itemSchema);
    console.log("Body :",req.body);
    Items.find(req.body)
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err));
  })

.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
  var Items=mongoose.model(req.params.category, itemSchema);
    Items.remove(req.body)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});



module.exports = itemRouter;