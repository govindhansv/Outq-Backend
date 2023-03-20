

/* View User Booking */

import Order from "../models/Order.js";
import Store from "../models/Store.js";
import Booking from "../models/Booking.js";
import TimeSlot from "../models/TimeSlot.js"
import Service from "../models/Service.js"

export const viewall = async (req, res) => {
    // // //console.log('called');
    try {
        const { userid } = req.params;
        const orders = await Order.find({ "userid": userid }).select('-createdAt').select('-__v').select('-updatedAt');
        orders.forEach(element => {
            // // // //console.log(element);
            element.orderid = element._id;
        });
        res.status(201).json(bookings);
    } catch (err) {
        // // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const storeorders = async (req, res) => {
    // // //console.log('called');
    try {
        const { storeid } = req.params;
        const orders = await Order.find({ "storeid": storeid }).select('-createdAt').select('-__v').select('-updatedAt');
        orders.forEach(element => {
            // // // //console.log(element);
            element.orderid = element._id;
        });
        // // //console.log(orders);
        res.status(201).json(orders);
    } catch (err) {
        // // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const viewsingle = async (req, res) => {
    // // //console.log('called');
    try {
        const { id } = req.params;
        const order = await Order.find({ id }).select('-createdAt').select('-__v').select('-updatedAt');
        res.status(201).json(order);
    } catch (err) {
        // // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};


export const done = async (req, res) => {
    // //console.log('Done');
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

        let service = await Service.findOne({ _id:obj.serviceid });

        let timeslots1 = await TimeSlot.find({ storeid: obj.storeid, date: obj.date }).select('times').select('date');
        let timeslots = timeslots1[0].times;
        // //console.log("firstdate", timeslots1);
        // //console.log("firstdateid", timeslots1[0]._id);

        let array = [];

        function multipleblocking(start) {
            let nots = service.duration / 5
            nots = Math.ceil(nots);
            array.push(start);
            for (let index = 0; index < nots - 1; index++) {
                start = addMinutesToTimeString(start, 5);
                array.push(start);
            }
    
            // //console.log(array);
            // //console.log('nots cal');
            array.forEach(ele => {
                timeslots.forEach(e => {
                    if (e.time == ele) {
                        e.count = e.count - 1;
                        if (e.status = "b") {
                        e.status = "n"
                        }
                    }
                });
            });
        }
        multipleblocking(obj.start);

        TimeSlot.findByIdAndUpdate(
            { _id: timeslots1[0]._id },
            {
                $set:
                {
                    times: timeslots
                }
            }
        ).then(async (data, err) => {
            if (err) {
                // //console.log(err);
            } else {
                // //console.log(data);
            }
        })
        res.status(201).json({ success:true });
    } catch (err) {
        // //console.log("Done err", err);
        res.status(500).json({ error: err.message });
    }
};



function addMinutesToTimeString(timeString, minutesToAdd) {

    let startTime = new Date("2023-02-21 " + timeString);

    // add 60 minutes to the starting time
    let endTime = new Date(startTime.getTime() + minutesToAdd * 60000);

    // get the hours and minutes of the end time
    let endHours = endTime.getHours();
    let endMinutes = endTime.getMinutes();

    // format the end time as a string in 12-hour format
    let formattedEndTime = `${(endHours % 12 || 12)}:${endMinutes.toString().padStart(2, '0')} ${endHours < 12 || endHours === 24 ? 'AM' : 'PM'}`;

    // format the starting time as a string in 12-hour format
    let formattedStartTime = startTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedEndTime;
}

