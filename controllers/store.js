import Store from "../models/Store.js";
import Owner from "../models/Owner.js";

// STORE CRUD
/* REGISTER STORE */

export const register = async (req, res) => {
    try {
        // // console.log(req.body);
        let {
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
        if (img ==""){
            img = "https://www.shutterstock.com/image-photo/female-hairdresser-standing-making-hairstyle-260nw-391326496.jpg"
        }
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
        // const stores = await Store.find({ownerId:ownerId});
        // // console.log(store);
        // res.status(201).json({ store:store, stores:stores });
        res.status(201).json({ success: true, store: store });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/* READ STORES*/

export const getOwnerStores = async (req, res) => {
    try {
        const { ownerId } = req.params;
        // // console.log(ownerId);
        const stores = await Store.find({ id: ownerId }).select('-createdAt').select('-__v').select('-updatedAt').select('-followerslist').select('-followerscount').select('-pincode').select('-longitude').select('-latitude').select('-bookedtimes');
        // // console.log(stores);;
        // // console.log(stores);;
        // // console.log(stores);
        stores.forEach(element => {
            // // console.log(element);
            element.type = element._id;
        });
        // // console.log(stores);
        res.status(200).json(stores);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// READ ALL STORE
export const getAllStore = async (req, res) => {
    try {
        let stores = await Store.find({}).select('-createdAt').select('-__v').select('-updatedAt').select('-followerslist').select('-pincode').select('-longitude').select('-latitude').select('-bookedtimes');
        // // console.log(stores);;
        stores.reverse();

        stores.forEach(element => {
            // // console.log(element);
            element.type = element._id;
        });
        // console.log(stores);
        res.status(200).json(stores);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// READ A SINGLE STORE
export const getStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.find({ _id: storeId });

        res.status(200).json(store);
    } catch (err) {
        // console.log(err);
        res.status(404).json({ message: err.message });
    }
};

//   DEL STORE
export const delStore = async (req, res) => {
    try {
        const { id } = req.params;
        Store.remove({ id },
            function (err, data) {
                if (err) {
                    res.status(200).json({ status: false, err: err });
                }
                else {
                    res.status(200).json({ status: true, data: data });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//   SEARCH STORE
export const searchStore = async (req, res) => {
    try {
        const { query } = req.params;
        // console.log(" query ", query);
        Store.find({ name: { $regex: query, $options: 'i' } })
            .sort({ name: 'asc' })
            .exec((err, objects) => {
                if (err) {
                    return res.status(500).send(err);
                }
                objects.forEach(element => {
                    // // console.log(element);
                    element.type = element._id;
                });
                res.json(objects);
            });

        // Store.find({ name: { $in:  [query, '']} })
        //     .sort({ name: 'asc' })
        //     .exec((err, objects) => {
        //         if (err) {
        //             return res.status(500).send(err);
        //         }
        //         objects.forEach(element => {
        //             // // console.log(element);
        //             element.type = element._id;
        //         });
        //         res.json( objects);
        //     });

        // Model.find({ field: { $eq: value } })
        // Model.find({ field: { $in: [value1, value2, ...] } })
        // search array of words
        
    } catch (err) {

        res.status(200).json({ message: "ERR ", ERR: err });
    }
};

// UPDATE STORE
export const updateStore = async (req, res) => {
    // // console.log('called');
    try {

        Store.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            function (err, data) {
                if (err) {
                    // // console.log(err);
                    res.status(200).json({ status: false, err: err });
                }
                else {
                    // // console.log(data);
                    res.status(200).json({ status: true, data: data });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

