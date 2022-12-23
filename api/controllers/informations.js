const pool = require('../data/data_base');

const queries = require('../queries/informations_queries');

const getInformations = (req, res) => {
  pool.query(queries.getInformations, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const addInformation = (req, res) => {
  console.log('OK');
  console.log(req.body);
  const { firstname, lastname, email, tel, message, advertisment } = req.body;
  pool.query(
    queries.addInformation,
    [firstname, lastname, email, tel, message, advertisment],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('Information Added!');
    }
  );
};

module.exports = { getInformations, addInformation };
