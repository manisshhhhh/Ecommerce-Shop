import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors'
import users from './data/users.js'
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany(); //before import data u want to clean up your database.
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users); // user inserted

        const adminUser = createdUsers[0]._id; // get the admin, bcoz only admin can insert product.

        const sampleProducts = products.map((product) => { //create all the products with admin user
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts); // insert all the product in to the data base

        console.log('Data Imported!'.green.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

