var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('hi');
  next();
})

router.post('/', (req, res, next) => {
  res.send('hi');
  next();
})

router.get('/add', (req, res, next) => {
  res.render('addpage');
  next();
})

module.exports = router;

/*

res.render('index', {
                  title: 'Twitter.js',
                  tweets: tweets // an array of only one element ;-)
              });

*/