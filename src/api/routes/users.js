var express = require('express'),
  router = express.Router(),
  userController = require('../controller/UserController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/signUp', (req, res, next) => {
  userController.registerUser(req.body, (data) => {
    res.json(data);
  })
});
router.post('/login', (req, res, next) => {
  userController.login(req.body, (data) => {
    res.json(data);
  })
});
router.post('/logout', (req, res, next) => {
  userController.logout(req.body, (data) => {
    res.json(data);
  })
});
router.post('/getUsers', (req, res, next) => {
  userController.getUsers(req.body, (data) => {
    res.json(data);
  })
});
router.post('/approveUser', (req, res, next) => {
  userController.approveUser(req.body, (data) => {
    res.json(data);
  })
});
router.post('/deleteUser', (req, res, next) => {
  userController.deleteUser(req.body, (data) => {
    res.json(data);
  })
});

module.exports = router;