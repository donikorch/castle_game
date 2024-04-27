const router = require('express').Router();

const usersApiRouter = require('./api/users.router');
const authApiRouter = require('./api/auth.router');
const gameApiRouter = require('./api/game.router');

router.use('/api/auth', authApiRouter);
router.use('/api/users', usersApiRouter);
router.use('/api/game', gameApiRouter);

module.exports = router;
