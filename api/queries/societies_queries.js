const getSocieties = 'SELECT * FROM societies';

const addSocietie = `
  INSERT INTO societies (society, email, tel, adress)
  VALUES
    ($1, $2, $3, $4);
`;

const removeSocietie = `DELETE FROM societies WHERE id = $1`;

const checkID = `SELECT id FROM societies WHERE id = $1`;

module.exports = {
  getSocieties,
  addSocietie,
  removeSocietie,
  checkID,
};
