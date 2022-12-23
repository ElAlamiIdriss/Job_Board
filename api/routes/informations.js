const { Router } = require('express');

const {
  getInformations,
  addInformation,
} = require('../controllers/informations');

const router = Router();

router.get('/', getInformations);
router.post('/', addInformation);

module.exports = router;
