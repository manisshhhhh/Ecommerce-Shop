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

//@decs Create a Product
//@route POST /api/products
//@accecc Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createProduct = await product.save();
    res.status(201).json(createProduct);
})

//@decs Update a product
//@route PUT /api/products/:id
//@accecc Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.staus(404);
        throw new Error('Resource not found');
    }
})

//@decs Delete a Product
//@route DELETE /api/products/:id
//@accecc Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product deleted' });
    } else {
        res.staus(404);
        throw new Error('Resource not found');
    }
})


export { getProductById, getProducts, createProduct, updateProduct, deleteProduct };