const getAdvertisements = 'SELECT * FROM advertisements';

const addAdvertisement = `
  INSERT INTO advertisements (work, wages, working_time, adress, description, society_id)
  VALUES
    ($1, $2, $3, $4, $5, $6);
`;

const removeAdvertisement = `DELETE FROM advertisements WHERE id = $1`;

const checkID = `SELECT id FROM advertisements WHERE id = $1`;

module.exports = {
  getAdvertisements,
  addAdvertisement,
  removeAdvertisement,
  checkID,
};
