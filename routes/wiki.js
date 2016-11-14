var express = require('express');
var router = express.Router();
var models = require('../models')
var Page = models.Page;
var User = models.User;


router.get('/', (req, res, next) => {

  Page.findAll({

  }).then((pages)=>{
    console.log(pages)
    res.render('index', {pages})
  }).catch(next);



  // res.render('index');
  // res.redirect('/');

})

router.post('/', (req, res, next) => {
  // var urlTitle = req.body.title;
  // urlTitle = urlTitle.replace(/\s+/g, '_').replace(/\W+/g, '');

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    urlTitle: req.body.title,
  })

  page.save().then(function () {
    console.log(this)
    res.redirect('/wiki/' + page.urlTitle)
        next();
  });
})

router.get('/add', (req, res, next) => {
  res.render('addpage');
  next();
})

router.get('/:urlTitle', (req,res,next)=>{
Page.findOne({
  where: {
    urlTitle : req.params.urlTitle
  }
})
.then((page)=>{
  // res.json(page);
  res.render('wikipage', {page});

})
.catch(next);




// res.send(req.params.urlTitle);
})


module.exports = router;




/*

res.render('index', {
                  title: 'Twitter.js',
                  tweets: tweets // an array of only one element ;-)
              });

*/