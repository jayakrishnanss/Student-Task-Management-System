var express = require('express'),
  router = express.Router(),
  taskController = require('../controller/TaskController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/createTask', (req, res, next) => {
  taskController.createTask(req.body, (data) => {
    res.json(data);
  })
});
router.post('/listTasks', (req, res, next) => {
  taskController.getTasks(req.body, (data) => {
    res.json(data);
  })
});
router.post('/submitTask', (req, res, next) => {
  taskController.submitTask(req.body, (data) => {
    res.json(data);
  })
});
router.get('/getSubmittedTasks', (req, res, next) => {
  taskController.getSubmittedTasks( (data) => {
    res.json(data);
  })
});
router.post('/submitResult', (req, res, next) => {
  taskController.submitResult(req.body, (data) => {
    res.json(data);
  })
});
module.exports = router;