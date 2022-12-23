const [{ firstname, lastname, age, tel, email, stat }] = JSON.parse(
  fs.readFileSync(`${__dirname}/data/admin.json`, 'utf8')
);

// const [{ firstname, lastname, age, tel, email, stat }] = JSON.parse(
//   fs.readFileSync(`${__dirname}/data/advertisement.json`, 'utf8')
// );

// const [{ firstname, lastname, age, tel, email, stat }] = JSON.parse(
//   fs.readFileSync(`${__dirname}/data/admin.json`, 'utf8')
// );

const queriesCreateUsersInit = `
  INSERT INTO users (firstname, lastname, age, tel, email, stat)
  VALUES 
    ('${firstname}', '${lastname}', '${age}', '${tel}', '${email}', '${stat}');
`;

const queriesCreateAdvertisementsInit = `
  INSERT INTO users (firstname, lastname, age, tel, email, stat)
  VALUES 
    ('${firstname}', '${lastname}', '${age}', '${tel}', '${email}', '${stat}');
`;

const queriesCreateSocietiesInit = `
  INSERT INTO users (firstname, lastname, age, tel, email, stat)
  VALUES 
    ('${firstname}', '${lastname}', '${age}', '${tel}', '${email}', '${stat}');
`;

const allUsers = 'SELECT * FROM users';
const allAdvertisements = 'SELECT * FROM advertisements';
const allSocieties = 'SELECT * FROM societies';

const createUsersInit = function () {
  pool.query(queriesCreateUsersInit, (err, result) => {
    if (err) throw err;
  });
};

const createAdvertisementsInit = function () {
  pool.query(queriesCreateUsersInit, (err, result) => {
    if (err) throw err;
  });
};

const createSocietiesInit = function () {
  pool.query(queriesCreateUsersInit, (err, result) => {
    if (err) throw err;
  });
};

pool.query(allUsers, (err, result) => {
  if (err) throw err;
  if (result.rows.length > 0) return;
  createUsersInit();
});

pool.query(allAdvertisements, (err, result) => {
  if (err) throw err;
  if (result.rows.length > 0) return;
  createAdvertisementsInit();
});

pool.query(allSocieties, (err, result) => {
  if (err) throw err;
  if (result.rows.length > 0) return;
  createSocietiesInit();
});
