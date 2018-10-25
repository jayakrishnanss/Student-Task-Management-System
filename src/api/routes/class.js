var express = require('express'),
  router = express.Router(),
  classController = require('../controller/ClassController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/createClass', (req, res, next) => {
  classController.createClass(req.body, (data) => {
    res.json(data);
  })
});
router.get('/listClasses', (req, res, next) => {
  classController.getClasses((data) => {
    res.json(data);
  })
});
router.post('/getStudentClass', (req, res, next) => {
  classController.getStudentClass(req.body, (data) => {
    res.json(data);
  })
});

module.exports = router;