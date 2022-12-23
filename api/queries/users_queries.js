const getUsers = 'SELECT * FROM users';

const addUser = `
  INSERT INTO users (firstname, lastname, tel, email, age, stat, username, password)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);
`;

const removeUser = `DELETE FROM users WHERE id = $1`;

const checkID = `SELECT id FROM users WHERE id = $1`;

const checkUser = `SELECT * FROM users WHERE username = $1 AND password = $2`;

module.exports = {
  getUsers,
  addUser,
  removeUser,
  checkID,
  checkUser,
};
