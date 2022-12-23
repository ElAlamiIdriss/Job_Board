const pool = require('../data/data_base');

const queries = require('../queries/users_queries');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '600s',
  });
};

const authenticateToken = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('NULL');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

const checkUser = (req, res, next) => {
  const { username, password } = req.body;

  pool.query(queries.checkUser, [username, password], (err, result) => {
    if (err) throw err;

    if (result.rows.length === 0) return res.status(400).send('User Not Found');
    req.body = result.rows[0];
    next();
  });
};

const sendToken = (req, res) => {
  const accessToken = generateAccessToken(req.body);
  res.json({ accessToken });
};

const sendUserWithToken = (req, res) => {
  res.json(req.user);
};

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const addUser = (req, res) => {
  const { username, password, firstname, lastname, email, age, stat, tel } =
    req.body;
  pool.query(
    queries.addUser,
    [firstname, lastname, tel, email, age, stat, username, password],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('User Added!');
    }
  );
};

const removeUser = (req, res) => {
  const { id } = req.body;
  console.log(id);

  pool.query(queries.checkID, [id], (err, result) => {
    if (!result.rows.length > 0)
      return res.status(404).send('Not Found this advertisement');

    pool.query(queries.removeSocietie, [id], (err, result) => {
      if (err) throw err;
      res.status(500).send('addvertisement Removed!!');
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
  checkUser,
  sendToken,
  authenticateToken,
  sendUserWithToken,
};
