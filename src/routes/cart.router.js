const { getAll, create} = require('../controllers/cart.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cartRouter = express.Router();

cartRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

module.exports = cartRouter;