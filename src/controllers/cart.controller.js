const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Cart.findAll({include: [Product, User], where:{userId}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {productId, quantity} = req.body
    const userId = req.user.id
    const result = await Cart.create({productId, quantity, userId});
    return res.status(201).json(result);
});


module.exports = {
    getAll,
    create
}