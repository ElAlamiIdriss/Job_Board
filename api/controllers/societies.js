const pool = require('../data/data_base');

const queries = require('../queries/societies_queries');

const getSocieties = (req, res) => {
  pool.query(queries.getSocieties, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const addSocietie = (req, res) => {
  const { work, description, wages, adress, working_time, society_id } =
    req.body;
  pool.query(
    queries.addSocietie,
    [work, wages, working_time, adress, description, society_id],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('Advertisement Added!');
    }
  );
};

const removeSocietie = (req, res) => {
  const { id } = req.body;

  pool.query(queries.checkID, [id], (err, result) => {
    if (!result.rows.length > 0)
      return res.status(404).send('Not Found this advertisement');

    pool.query(queries.removeSocietie, [id], (err, result) => {
      if (err) throw err;
      res.status(500).send('addvertisement Removed!!');
    });
  });
};

module.exports = { getSocieties, addSocietie, removeSocietie };
