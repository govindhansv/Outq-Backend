let timearray = [];

for (let index = 0; index < service.duration; index++) {
    var newTime = new Date(new Date("1970/01/01 " + start).getTime() + index * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    timearray.push(newTime)
}

const update = { $push: { bookedtimes: { $each: timearray } } };

Store.updateOne({ _id: storeid }, update, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        // //console.log(`Added ${timearray.length} new values `);
    }
});
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
        // //console.log(" endtime", endtime);

        end = endtime;


        const timeslots = await TimeSlot.find({ serviceid: serviceid }).select('start').select('end').select('date');
        var err = false;

        var count = 0;

        timeslots.forEach(element => {
            
            if (element.date == date) {
                if (convertToTime(element.start) < convertToTime(start) && convertToTime(element.end) > convertToTime(start)) {
                    count  = count+1;
                    // err = true;
                }
            }
        });

        // //console.log(" count is qual to ", count);
        const s = await Store.find({ storeid: storeid });

        let employeecount = parseInt(store.employees);
        // //console.log("fgd", employeecount);

        if (employeecount < count ) {
            err = true;
        }


        if (err) {
            // //console.log(' Already booked');
            res.status(500).json({ "success": false });
        } else {

            const time = await Store.find({ storeid: storeid });

            // //console.log("timebhgfb gfnbgfhbf ghcf", time);
            // //console.log("timebhgfb gfnbgfhbf ghcf", time[0].bookedtimes);
            let timecount = 0;
            let duptimes = time[0].bookedtimes
            // //console.log("d", time[0].bookedtimes.length);

            // //console.log("emp", store.employees);
            let employeecount = parseInt(store.employees);
            // //console.log("fgd", employeecount);


            duptimes.forEach(element => {

                if (element == start) {
                    timecount = timecount + 1;
                }
            });

           

            if (!err) {
                
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

                const newTimeSlot = new TimeSlot({
                    start,
                    end,
                    storeid,
                    serviceid,
                    date
                });
                const savedTimeSlot = await newTimeSlot.save();
                res.status(201).json({ "success": true });
            } else {
                // //console.log(' Already booked');
                res.status(500).json({ "success": false });
            }
        }

        let timearray = [];

        for (let index = 0; index < service.duration; index++) {
            var newTime = new Date(new Date("1970/01/01 " + start).getTime() + index * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
            timearray.push(newTime)
        }

        const update = { $push: { bookedtimes: { $each: timearray } } };

        Store.updateOne({ _id: storeid }, update, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                // //console.log(`Added ${timearray.length} new values `);
            }
        });

    } catch (err) {
        // //console.log("err", err);
        res.status(500).json({ error: true });
    }
};

