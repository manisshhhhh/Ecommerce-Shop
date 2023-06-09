import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'

//@decs Create a new order
//@route POST /api/orders
//@accecc Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
})

//@decs Get logged in user orders
//@route GET /api/orders/myorders
//@accecc Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
})

//@decs Get order by Id
//@route GET /api/orders/:id
//@accecc Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(400);
        throw new Error('Order not found');
    }
})

//@decs Update order to paid
//@route GET /api/orders/:id/pay
//@accecc Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
})

//@decs Update order to delivered
//@route GET /api/orders/:id/deliever
//@accecc Private/Admin
const updateOrderToDelievered = asyncHandler(async (req, res) => {
    res.send('update order to delievered');
})

//@decs Get all orders
//@route GET /api/orders
//@accecc Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelievered,
    getOrders,
}