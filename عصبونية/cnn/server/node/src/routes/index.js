const { Router } = require('express');

const { addTowNumber, train } = require('../middlewares');

const router = Router();

router.get('/train/:l/:s', train);
router.get('/:a/:b', addTowNumber);

module.exports = router;
