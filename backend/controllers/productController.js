import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'

//@decs Fetch all Products
//@route GET /api/products
//@accecc Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

//@decs Fetch a Product
//@route GET /api/products/:id
//@accecc Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getProductById, getProducts };