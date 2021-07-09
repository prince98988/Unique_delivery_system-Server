var express = require('express');
const bodyParser = require('body-parser');

var Notices = require('../models/notice');
var authenticate = require('../authenticate');
const cors = require('./cors');

var noticeRouter = express.Router();
noticeRouter.use(bodyParser.json());

noticeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Notices.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    req.body.user=req.user._id;
    Notices.create(req.body)
    .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(item);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = noticeRouter;