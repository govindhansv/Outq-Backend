

/* View User Booking */

import Order from "../models/Order.js";
import Store from "../models/Store.js";
import Booking from "../models/Booking.js";

export const viewall = async (req, res) => {
    // console.log('called');
    try {
        const { userid } = req.params;
        const orders = await Order.find({ "userid": userid }).select('-createdAt').select('-__v').select('-updatedAt');
        orders.forEach(element => {
            // // console.log(element);
            element.orderid = element._id;
        });
        res.status(201).json(bookings);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const storeorders = async (req, res) => {
    // console.log('called');
    try {
        const { storeid } = req.params;
        const orders = await Order.find({ "storeid": storeid }).select('-createdAt').select('-__v').select('-updatedAt');
        orders.forEach(element => {
            // // console.log(element);
            element.orderid = element._id;
        });
        // console.log(orders);
        res.status(201).json(orders);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const viewsingle = async (req, res) => {
    // console.log('called');
    try {
        const { id } = req.params;
        const order = await Order.find({ id }).select('-createdAt').select('-__v').select('-updatedAt');
        res.status(201).json(order);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};


export const done = async (req, res) => {
    // console.log('Done');
    try {
        const { id } = req.params;

        let obj = await Booking.findOne({ _id: id });
        let store = await Store.findOne({ _id: obj.storeid });      
        
        const newOrder = new Order({
            start: obj.start,
            end: obj.end,
            storeid: obj.storeid,
            serviceid: obj.serviceid,
            userid: obj.userid,
            price: obj.price,
            date: obj.date,
            servicename: obj.servicename,
            storename: obj.storename,
            status: "Success",
            ownerid: store.ownerid
        });

        newOrder.save();

        await Booking.deleteOne({ _id: id });
        
    } catch (err) {
        // console.log("Done err", err);
        res.status(500).json({ error: err.message });
    }
};