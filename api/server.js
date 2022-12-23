const express = require('express');
const cors = require('cors');

const advertisementsRoutes = require('./routes/advertisements');
const societiesRoutes = require('./routes/societies');
const usersRoutes = require('./routes/users');
const informationsRoutes = require('./routes/informations');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/advertisements', advertisementsRoutes);
app.use('/api/v1/societies', societiesRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/informations', informationsRoutes);

app.listen(port, () =>
  console.log(`App JobBoarding listening on port ${port}`)
);
