const { Router } = require('express');
const {
  getUsers,
  addUser,
  checkUser,
  sendToken,
  authenticateToken,
  sendUserWithToken,
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers).post('/', addUser);

router
  .post('/token', checkUser, sendToken)
  .get('/token', authenticateToken, sendUserWithToken);

module.exports = router;
