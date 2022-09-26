const express = require('express');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = { routes };
