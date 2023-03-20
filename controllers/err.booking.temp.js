//Store.js
import Time from "../models/Time.js";

// STORE CRUD
/* REGISTER STORE */

function convertToTime(timeString) {
    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }

    // //console.log(convertTime12to24(timeString));
    let time = convertTime12to24(timeString);

    return time;
}

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


export const register = async (req, res) => {
    try {
        // // //console.log(req.body);
        const {
            name,
            location,
            id,
            description,
            type,
            img,
            start,
            end,
            employees,
            longitude,
            latitude,
            pincode
        } = req.body;

        // const owner = await Owner.findById(ownerId);
        // const owner = await Owner.findOne({ firstName: ownerId });
        const newStore = new Store({
            name,
            location,
            id,
            description,
            type,
            img,
            start,
            end,
            employees,
            longitude,
            latitude,
            pincode
            // ownerf:owner.firstName,
            // ownerl:owner.lastName,
        });

        const store = await newStore.save();
        // //console.log(store);

        let time = convertToTime(start);
        let time1 = convertToTime(start);


        // for (let index = 0; time < convertToTime(end); index = index + 10) {
        let timearray = [];
        // Define the start and end times as Date objects
        const startTime = new Date(`2023-02-25T0${convertToTime(start)}`);
        const endTime = new Date(`2023-02-25T${convertToTime(end)}`);

        // Calculate the difference in hours as an integer
        const diffHours = Math.floor((endTime.getTime() - startTime.getTime()) / 3600000);

        // //console.log(diffHours); // Output: 7


        for (let hour = 0; hour < diffHours; hour = hour + 1) {

            let array = [];

            for (let index = 0; index < 60; index = index + 10) {
                time = addMinutesToTimeString(time, 10)

                let obj = {
                    time: time,
                    count: 0,
                    status: "n"
                }
                array.push(obj);
            }

            let timeobj = {
                top: time,
                times: array,
                storeid: store._id,
                start,
                end,
                date:""
            }

            timearray.push(timeobj)
            const newTime = new Time(timeobj);
            await newTime.save();
            time1 = addMinutesToTimeString(time1, 60);
        }
        // //console.log(timearray);

      


        // const stores = await Store.find({ownerId:ownerId});
        // // //console.log(store);
        // res.status(201).json({ store:store, stores:stores });
        res.status(201).json({ success: true, store: store });
        // res.status(409).json({ error: err.message });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};


//Booking.js

import Booking from "../models/Booking.js"
import Order from "../models/Order.js";
import Store from "../models/Store.js";
import User from "../models/User.js";
import TimeSlot from "../models/TimeSlot.js"
import Service from "../models/Service.js"
import Timings from "../models/Timings.js"
import Time from "../models/Time.js";

function convertToTime(timeString) {
    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }

    // //console.log(convertTime12to24(timeString));
    let time = convertTime12to24(timeString);

    return time;
}

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



/* Create new booking order */
export const book = async (req, res) => {
    // //console.log('called');
    try {
        let {
            start,
            end,
            storeid,
            serviceid,
            userid,
            price,
            date,
            servicename,
            storename,
            img,
        } = req.body;

        let service = await Service.findOne({ serviceid });
        let store = await Store.findOne({ storeid });
        let endtime = addMinutesToTimeString(start, service.duration);
        let user = await User.findOne({ userid });
        end = endtime;

        let employeecount = parseInt(store.employees);
        // //console.log("employee count", employeecount);
        // //console.log(" endtime", end);


        const timeslots = await Time.find({ storeid: storeid }).select('start').select('end').select('date').select('times');
        var err = false;

        var count = 0;

        // //console.log("Started counting", count);

        timeslots.forEach(element => {

            if (element.date == date) {
                if (convertToTime(element.start) < convertToTime(start) && convertToTime(element.end) > convertToTime(start)) {
                    count = count + 1;
                    // err = true;
                }
            }
        });

        // //console.log(" count is equal to ", count);


        if (employeecount < count + 1) {
            err = true;
        }


        if (err) {
            // //console.log(' Already booked');
            res.status(500).json({ "success": false });
        } else {

            const newBooking = new Booking({
                start,
                end,
                storeid,
                serviceid,
                userid,
                price,
                date,
                servicename,
                storename,
                img,
                username: user.name
            });

            const savedBooking = await newBooking.save();

            const savedTime = await newTime.save();

            res.status(201).json({ "success": true });

        }

    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: true });
    }
};



/* Create new booking order */
export const booking = async (req, res) => {
    // //console.log('called');
    try {
        let {
            start,
            end,
            storeid,
            serviceid,
            userid,
            price,
            date,
            servicename,
            storename,
            img,
        } = req.body;
        // //console.log(req.body);
        let service = await Service.findOne({ serviceid });
        // //console.log(service);
        end = start;

        let user = await User.findOne({ userid });
        // // //console.log(" user \n\n\n\n" ,user.name);

        // //console.log(req.body);

        const timeslots = await TimeSlot.find({ serviceid: serviceid }).select('start').select('date');

        const store = await Store.find({ _id: storeid });
        // //console.log(" store", store);

        const time = await TimeSlot.find({ serviceid: serviceid, start: start });

        // //console.log("d", time.length);
        var err;
        // //console.log("emp", store[0].employees);
        let employeecount = parseInt(store[0].employees);
        // //console.log("fgd", employeecount);


        timeslots.forEach(element => {

            if (element.start == start && element.date == date) {
                if (employeecount < time.length + 1) {
                    err = true;
                }
            }
        });

        if (err) {
            res.status(500).json({ "success": false });

        } else {
            // //console.log(" hell ");

            const newBooking = new Booking({
                start,
                end,
                storeid,
                serviceid,
                userid,
                price,
                date,
                servicename,
                storename,
                img,
                username: user.name
            });

            const savedBooking = await newBooking.save();
            if (employeecount == time.length) {

                const newTimeSlot = new TimeSlot({
                    start,
                    end,
                    storeid,
                    serviceid,
                    date
                });

                const savedTimeSlot = await newTimeSlot.save();
            }

            res.status(201).json({ "success": true });
        }


    } catch (err) {
        // //console.log("err", err);
        res.status(201).json({ "success": false });

    }
};


/* View User Booking */

export const viewall = async (req, res) => {
    // //console.log('called');
    try {
        const { userid } = req.params;
        const bookings = await Booking.find({ "userid": userid }).select('-createdAt').select('-__v').select('-updatedAt');
        bookings.forEach(element => {
            // // //console.log(element);
            element.bookingid = element._id;
            // element.username = element._id;
        });
        // //console.log(" nbooking ");
        // //console.log(bookings);
        res.status(201).json(bookings);
    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const storebooking = async (req, res) => {
    // //console.log('called');
    try {
        const { storeid } = req.params;
        const bookings = await Booking.find({ "storeid": storeid }).select('-createdAt').select('-__v').select('-updatedAt');
        bookings.forEach(element => {
            // // //console.log(element);
            element.bookingid = element._id;
        });
        // //console.log(bookings);
        res.status(201).json(bookings);
    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const viewsingle = async (req, res) => {
    // //console.log('called');
    try {
        const { id } = req.params;
        const booking = await Booking.find({ id }).select('-createdAt').select('-__v').select('-updatedAt');
        res.status(201).json(booking);
    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const cancelbooking = async (req, res) => {
    // //console.log('called');
    try {
        const { id } = req.params;

        let obj = await Booking.findOne({ _id: id });
        let store = await Store.findOne({ _id: obj.storeid });
        // //console.log(obj);
        // //console.log(store);

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
            status: "Cancelled",
            ownerid: store.ownerid
        });

        newOrder.save();

        await Booking.deleteOne({ _id: id });

    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};


export const getTimeSlots = async (req, res) => {
    // //console.log('called');
    try {
        // find time slots based on store id not on service id

        const { storeid, date } = req.params;
        // //console.log(storeid, date);
        const timeslots = await Time.find({ storeid: storeid, date: date }).select('start').select('end').select('date').select('times');
        // //console.log(timeslots);
        res.status(201).json(timeslots);
    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

// export const getTimeSlots = async (req, res) => {
//     // //console.log('called');
//     try {
//         // find time slots based on store id not on service id

//         const { storeid, date } = req.params;
//         // //console.log(storeid, date);
//         const timeslots = await TimeSlot.find({ storeid: storeid, date: date }).select('start').select('end').select('date');
//         // //console.log(timeslots);
//         let times = [];
//         timeslots.forEach(element => {
//             times.push({ start: element.start, end: element.end, date: element.date })
//         });
//         // //console.log(times);
//         res.status(201).json(times);
//     } catch (err) {
//         // //console.log("err", err);
//         res.status(500).json({ error: err.message });
//     }
// };