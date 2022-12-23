const pool = require('../data/data_base');

const queries = require('../queries/advertisements_queries');

const getAdvertisements = (req, res) => {
  pool.query(queries.getAdvertisements, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const addAdvertisement = (req, res) => {
  const { work, description, wages, adress, working_time, society_id } =
    req.body;
  pool.query(
    queries.addAdvertisement,
    [work, wages, working_time, adress, description, society_id],
    (err, result) => {
      if (err) throw err;
      res.status(201).send('Advertisement Added!');
    }
  );
};

const removeAdvertisement = (req, res) => {
  const { id } = req.body;
  console.log(id);

  pool.query(queries.checkID, [id], (err, result) => {
    if (!result.rows.length > 0)
      return res.status(404).send('Not Found this advertisement');

    pool.query(queries.removeAdvertisement, [id], (err, result) => {
      if (err) throw err;
      res.status(500).send('addvertisement Removed!!');
    });
  });
};

module.exports = { getAdvertisements, addAdvertisement, removeAdvertisement };
