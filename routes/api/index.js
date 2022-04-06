const router = require('express').Router();
const thoughtsRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes.js');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);

module.exports = router;
