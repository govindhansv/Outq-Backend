import Store from "../models/Store.js";
import Service from "../models/Service.js"
import User from "../models/User.js"
import Noti from "../models/Noti.js"

// SERVICES CRUD

// REG SERVICES
export const addService = async (req, res) => {
    console.log('called');
    try {

        let {
            name,
            description,
            price,
            ogprice,
            img,
            ownerid,
            storeid,
            duration,

        } = req.body;

        if (img == "") {
            img = "https://www.shutterstock.com/image-photo/female-hairdresser-standing-making-hairstyle-260nw-391326496.jpg"
        }
        // console.log(req.body);

        const store = await Store.findOne({ _id: storeid })

        const newService = new Service({
            name,
            description,
            price,
            ogprice,
            img,
            ownerid,
            storeid,
            duration,
            start: store.start,
            end: store.end,
            storename: store.name,
            longitude: store.longitude,
            latitude: store.latitude,
            pincode: store.pincode,
            distance: ""
        });

        const service = await newService.save();
        console.log(store);
        let array = store.followerslist;
        console.log(" array", array);

        for (let i = 0; i < array.length; i++) {
            console.log(array[i]);
            let user = await User.findOne({ _id: array[i] });
            console.log(user);
            const newNoti = new Noti({
                title: `${store.name} is updated their ${name} service price from ${ogprice}  to ${price} `,
                message: `Service Updated`,
                userid: user._id
            });
            const noti = await newNoti.save();
            console.log(noti);
        }

        // console.log(" serv", service);

        res.status(201).json({ success: true });
    } catch (err) {
        console.log("err", err);
        res.status(409).json({ error: err.message });
    }
};

/* READ Services of a store*/

export const getStoreServices = async (req, res) => {
    try {
        const { storeid } = req.params;
        const services = await Service.find({ storeid: storeid }).select('-createdAt').select('-__v').select('-updatedAt').select('-pincode').select('-longitude').select('-latitude').select('-distance');
        services.forEach(element => {
            // // console.log(element);
            element.id = element._id;
        });
        // // console.log(services);
        res.status(200).json(services);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/* READ Service Data*/

export const getAllService = async (req, res) => {
    try {
        const services = await Service.find({}).select('-createdAt').select('-__v').select('-updatedAt').select('-pincode').select('-longitude').select('-latitude').select('-distance');

        const stores = await Store.find({}).select('-createdAt').select('-__v').select('-updatedAt');;
        services.forEach(element => {
            // // console.log(element);
            element.ownerid = element._id;
        });
        res.status(200).json(services);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* READ Service Data*/

export const getService = async (req, res) => {
    // console.log(" called");
    try {
        // console.log(' dfkhsdf');
        const { serviceId } = req.params;
        const service = await Service.find({ _id: serviceId }).select('-createdAt').select('-__v').select('-updatedAt').select('-pincode').select('-longitude').select('-latitude').select('-distance');

        service.forEach(element => {
            // // console.log(element);
            element.id = element._id;
        });

        // // console.log(service);
        res.status(201).json(service);
    } catch (err) {
        // console.log(err);
        res.status(404).json({ message: err.message });
    }
};

// UPDATE SERVICES
export const updateService = async (req, res) => {
    // console.log(' called ');
    // console.log(" er bo", req.body, req.params.id);
    try {
console.log(req.body);
        Service.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            function (err, data) {
                if (err) {
                    res.status(200).json({ status: false, err: err });
                }
                else {
                    res.status(200).json({ status: true, data: data });
                }
            });
        
        const store = await Store.findOne({ _id: req.body.storeid })

        let array = store.followerslist;
        console.log(" array", array);

        for (let i = 0; i < array.length; i++) {
            console.log(array[i]);
            let user = await User.findOne({ _id: array[i] });
            console.log(user);
            
            const newNoti = new Noti({
                title: `${store.name} is updated their ${req.body.name} service price from ${req.body.ogprice}  to ${req.body.price} `,
                message: `Service Updated`,
                userid: user._id
            });

            const noti = await newNoti.save();
            console.log(noti);
        }
    } catch (err) {
        // console.log(err);
        res.status(404).json({ message: err.message });
    }
};

// DELETE SERVICES

export const delService = async (req, res) => {
    // console.log(' called');
    try {
        const { id } = req.params;
        // // console.log(id);
        Service.deleteOne({ _id: id },
            function (err, data) {
                if (err) {
                    // console.log(err);
                    res.status(200).json({ status: false, err: err });
                }
                else {
                    // console.log(data);
                    res.status(200).json({ status: true, data: data });
                }
            });
    } catch (err) {
        // console.log(err);

        res.status(404).json({ message: err.message });
    }
};


//   SEARCH STORE
export const searchServices = async (req, res) => {
    // console.log(' called ');
    try {
        let userid = req.params.userid;
        let user = await User.findOne({ userid })
        const userLat = parseFloat(user.latitude);
        const userLng = parseFloat(user.longitude);

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1); // deg2rad below
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = R * c; // Distance in km
            function formatDistance(distance) {
                if (distance < 1) {
                    return (distance * 1000).toFixed(0) + ' m';
                } else {
                    return distance.toFixed(2) + ' km';
                }
            }
            d = formatDistance(d);
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        const { query } = req.params;
        // console.log(" query ", query);

        Service.find({ name: { $regex: query, $options: 'i' } })
            .sort({ name: 'asc' })
            .exec((err, objects) => {
                if (err) {
                    return res.status(500).send(err);
                }
                objects.forEach(element => {
                    // // console.log(element);
                    element.id = element._id;
                });

                objects.forEach(store => {
                    store.distance = calculateDistance(userLat, userLng, store.latitude, store.longitude);

                });

                // Sort the shops based on their distance
                objects.sort((a, b) => a.distance - b.distance);

                // console.log(objects);

                res.json(objects);
            });



    } catch (err) {
        // console.log(err);
        res.status(200).json({ message: "ERR ", ERR: err });
    }
};
