var express = require('express');
var router = express.Router();
var models = require('../models')
var Page = models.Page;
var User = models.User;


router.get('/', (req, res, next) => {
  res.render('index');
  // res.redirect('/');
  next();
})

router.post('/', (req, res, next) => {
var page = Page.build({
	title: req.body.title,
	content: req.body.content
	status: req.body.status
})
page.save();
	  // res.json(req.body);
	  res.redirect('/');

  next();
})

router.get('/add', (req, res, next) => {
  res.render('addpage');
  next();
})

// router.post('/add', (req, res, next) => {

//     next();
// })


module.exports = router;



/*

res.render('index', {
                  title: 'Twitter.js',
                  tweets: tweets // an array of only one element ;-)
              });

*/