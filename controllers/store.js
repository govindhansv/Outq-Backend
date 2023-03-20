import Store from "../models/Store.js";
import Service from "../models/Service.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

// STORE CRUD
/* REGISTER STORE */

export const register = async (req, res) => {
    try {
        // // // console.log(req.body);
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
            pincode,
            gender,
            working
        } = req.body;
        if (img == "") {
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
            pincode,
            gender,
            working,
            reviews:"5",
            reviewcount:1,
            // ownerf:owner.firstName,
            // ownerl:owner.lastName,
        });
        const store = await newStore.save();
        // const stores = await Store.find({ownerId:ownerId});
        console.log("store",store);
        // res.status(201).json({ store:store, stores:stores });
        const review = new Review({
            _id: new mongoose.Types.ObjectId(),
            rating: 5,
            comment: "",
            storeid: store._id,
            user: {name:"manu"},
        });

        const savedReview = await review.save();
        console.log(savedReview);
        res.status(201).json({ success: true, store: store });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
};

/* READ STORES*/

export const getOwnerStores = async (req, res) => {
    try {
        const { ownerId } = req.params;
        // // // console.log(ownerId);
        const stores = await Store.find({ id: ownerId }).select('-createdAt').select('-__v').select('-updatedAt').select('-followerslist').select('-followerscount').select('-pincode').select('-longitude').select('-latitude').select('-bookedtimes');
        // // // console.log(stores);;
        // // // console.log(stores);;
        // // // console.log(stores);
        stores.forEach(element => {
            // // // console.log(element);
            element.type = element._id;
        });
        // // // console.log(stores);
        res.status(201).json(stores);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// READ ALL STORE
export const getAllStore = async (req, res) => {
    try {
        let stores = await Store.find({}).select('-createdAt').select('-__v').select('-updatedAt').select('-followerslist').select('-pincode').select('-longitude').select('-latitude').select('-bookedtimes');
        // // // console.log(stores);;
        // stores.reverse();

        stores.forEach(element => {
            // // // console.log(element);
            element.type = element._id;
        });
        // // console.log(stores);
        res.status(201).json(stores);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// READ A SINGLE STORE
export const getStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findById(storeId);

        store.bookedtimes.push(" f");

        Store.findByIdAndUpdate(
            { _id: storeId },
            {
                $set:
                {
                    bookedtimes: store.bookedtimes
                }
            }
        ).then(async (data, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
        console.log(store);
        res.status(201).json(store);
    } catch (err) {
        // // console.log(err);
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
                    res.status(201).json({ status: false, err: err });
                }
                else {
                    res.status(201).json({ status: true, data: data });
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
        // // console.log(" query ", query);
        Store.find({ name: { $regex: query, $options: 'i' } })
            .sort({ name: 'asc' })
            .exec((err, objects) => {
                if (err) {
                    return res.status(500).send(err);
                }
                objects.forEach(element => {
                    // // // console.log(element);
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
        //             // // // console.log(element);
        //             element.type = element._id;
        //         });
        //         res.json( objects);
        //     });

        // Model.find({ field: { $eq: value } })
        // Model.find({ field: { $in: [value1, value2, ...] } })
        // search array of words

    } catch (err) {

        res.status(201).json({ message: "ERR ", ERR: err });
    }
};
//   QUERY STORE

export const queryStore = async (req, res) => {
    console.log('called');
    try {
        const { query } = req.params;

        let arr = [];
        let services = [];
        if (query == 'Men') {

            Store.find({ gender: { $in: ["Men", "Unisex"] } })
                .sort({ name: 'asc' })
                .exec(async (err, objects) => {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        let a = [];

                        objects.forEach(element => {
                            // // // console.log(element);
                            element.type = element._id;
                            a.push(element._id);
                        });

                        arr = arr.concat(a);
                        for (let i = 0; i < arr.length; i++) {
                            let service = await Service.find({ "storeid": arr[i] });
                            if (service) {
                                services = services.concat(service);
                            }
                        }
                       
                        res.status(201).json(services);
                    }
                });

        } else {

            Store.find({ gender: { $in: ["Women", "Unisex"] } })
                .sort({ name: 'asc' })
                .exec(async (err, objects) => {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        let a = [];

                        objects.forEach(element => {
                            // // // console.log(element);
                            element.type = element._id;
                            a.push(element._id);
                        });
                        
                        arr = arr.concat(a);
                        for (let i = 0; i < a.length; i++) {
                            let service = await Service.find({ "storeid": a[i] });
                            if (service) {
                                services = services.concat(service);
                            }
                        }
                        res.status(201).json(services);
                    }
                });
        }


    } catch (err) {
        console.log(err);
        res.status(501).json({ message: "ERR ", ERR: err });
    }
};

// UPDATE STORE
export const updateStore = async (req, res) => {
    // // // console.log('called');
    try {
        const { id,status } = req.params;

        Store.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            function (err, data) {
                if (err) {
                    // // // console.log(err);
                    res.status(201).json({ status: false, err: err });
                }
                else {
                    // // // console.log(data);
                    res.status(201).json({ status: true, data: data });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


// UPDATE STORE
export const working = async (req, res) => {
    // // console.log('called');
    try {
        
        console.log(req.params);
        let store = await Store.findById(req.params.storeid);
        let status;
        if (store.working =='on') {
            status = 'off';
        } else {
            status = 'on';
        }
        
        Store.findByIdAndUpdate({ _id:req.params.storeid },
            { working: status },{new:true},
            function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(201).json({ status: false, err: err });
                }
                else {
                    console.log(data);
                    res.status(201).json({ status: true, data: data });
                }
            });
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/* LOGGING IN */
export const storelocation = async (req, res) => {
    console.log('called');
    try {
      const { location, longitude, latitude } = req.body;
      console.log(location, longitude, latitude,req.params.storeid);
      Store.findByIdAndUpdate(req.params.storeid,
        { $set: req.body },
        function (err, data) {
          if (err) {
            res.status(501).json({ status: false, err: err });
          }
          else {
              console.log(data);
            res.status(201).json({ status: true, data: data });
          }
        });
      // res.status(201).json([{ "id": userid }]);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ error: true });
    }
  };
  