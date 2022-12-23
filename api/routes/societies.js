const { Router } = require('express');
const { getSocieties } = require('../controllers/societies');

const router = Router();

router.get('/', getSocieties);

module.exports = router;
