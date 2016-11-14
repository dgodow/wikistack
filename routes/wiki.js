var express = require('express');
var router = express.Router();
var models = require('../models')
var Page = models.Page;
var User = models.User;


router.get('/', (req, res, next) => {

  Page.findAll({

  }).then((pages)=>{
    res.render('index', {pages})
  }).catch(next);

})

router.post('/', (req, res, next) => {
  // var urlTitle = req.body.title;
  // urlTitle = urlTitle.replace(/\s+/g, '_').replace(/\W+/g, '');
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  }).spread((User) => {
    return User.id;
  })
    .then(function (userId) {
      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        urlTitle: req.body.title,
        authorId: userId
      });
      return page.save()
    })
    .then((page) => {
      // console.log(page);
      res.redirect('/wiki/' + page.urlTitle);
    })
    .catch(console.error);
})

router.get('/add', (req, res, next) => {
  res.render('addpage');
  next();
})

router.get('/users', (req, res, next) => {
  User.findAll({

  }).then((users) => {
    res.render('users', {users})
  }).catch(next);
})

router.get('/users/:id', (req, res, next) => {
  User.findOne({
    where: {
        id: req.params.id
    },
    include: [
        {model: Page, as: 'page'}
    ]
  }).then((user) => {
    console.log(user);
    res.render('author', {page: user.page, user: user})
  })
})


router.get('/:urlTitle', (req,res,next)=>{
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    }
  })
  .then((page) => {
    let user = User.findOne({
      where: {
        id: page.authorId
      }
    })
    return [page, user];
  })
  .spread((page, user) => {
    res.render('wikipage', {page: page, user: user});
  })
  .catch(next);
})



module.exports = router;
