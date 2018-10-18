var express = require('express'),
  router = express.Router(),
  userController = require('../controller/ClassController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/createClass', (req, res, next) => {
  userController.createClass(req.body, (data) => {
    res.json(data);
  })
});
router.get('/listClasses', (req, res, next) => {
  userController.getClasses((data) => {
    res.json(data);
  })
});

module.exports = router;