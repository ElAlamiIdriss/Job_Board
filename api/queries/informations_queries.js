const getInformations = 'SELECT * FROM informations';

const addInformation = `
  INSERT INTO informations (firstname, lastname, email, tel, message, advertisment)
  VALUES
    ($1, $2, $3, $4, $5, $6);
`;

module.exports = {
  getInformations,
  addInformation,
};
