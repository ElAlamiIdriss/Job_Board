const { Router } = require('express');

const {
  getAdvertisements,
  addAdvertisement,
  removeAdvertisement,
} = require('../controllers/advertisements');

const router = Router();

router.get('/', getAdvertisements);
router.post('/', addAdvertisement);
router.delete('/', removeAdvertisement);

module.exports = router;
