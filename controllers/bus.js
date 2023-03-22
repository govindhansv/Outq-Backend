import bcrypt from "bcrypt";
import User from "../models/User.js";
import Store from "../models/Store.js";

/* REGISTER USER */
export const register = async (req, res) => {
  // //console.log('called');
  try {
    const {
      // firstName,
      // lastName,
      name,
      email,
      pswd,
      // picturePath,
      // friends,
      phone,
      location,
      pincode,
      deviceid,

    } = req.body;

    // //console.log(req.body);
    // //console.log(name,email,pswd);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pswd, salt);

    const newUser = new User({
      // firstName,
      // lastName,
      name,
      email,
      pswd: passwordHash,
      // picturePath,
      // friends,
      phone,
      location,
      pincode,
      deviceid,
      cpswd: pswd
      // viewedProfile: Math.floor(Math.random() * 10000),
      // impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();

    let userid = savedUser._id.toString();
    // //console.log(userid);
    res.status(201).json([{ "id": userid }]);

    // res.status(201).json(savedUser);
  } catch (err) {
    // //console.log("err",err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  //console.log('called');
  try {
    const { email, pswd } = req.body;
    //console.log(email, pswd);
    const user = await User.findOne({ email: email });
    //console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. " });
      //console.log(' uaser not found');
    }

    const isMatch = await bcrypt.compare(pswd, user.pswd);
    //console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
      //console.log(' invalid');
    }

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    // res.status(201).json({ token, user });

    let userid = user._id.toString();
    let userlocation = user._id;
    // //console.log(userid);
    res.status(201).json([{ "id": userid }]);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const driverlogin = async (req, res) => {
  //console.log('called');
  try {
    const { email, pswd } = req.body;
    //console.log(email, pswd);
    const user = await User.findOne({ email: email });
    //console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. " });
      //console.log(' uaser not found');
    }

    const isMatch = await bcrypt.compare(pswd, user.pswd);
    //console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
      //console.log(' invalid');
    }

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    // res.status(201).json({ token, user });

    let userid = user._id.toString();
    let userlocation = user._id;
    // //console.log(userid);
    res.status(201).json([{ "id": userid }]);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ error: true });
  }
};



export const createbus = async (req, res) => {
    try {
        console.log(req.body);
        let {
            name,
            number,
            id,
            pswd,
            start,
            end,
        } = req.body;

        // const owner = await Owner.findById(ownerId);
        // const owner = await Owner.findOne({ firstName: ownerId });.

        const newStore = new Store({
            name,
            number,
            id,
            pswd,
            startplace,
            endplace,
        });
        const store = await newStore.save();
        // const stores = await Store.find({ownerId:ownerId});
        //console.log("store",store);
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
        console.log(err);
        res.status(409).json({ error: err.message });
    }
};

export const createcollection = async (req, res) => {
    try {
        // // // //console.log(req.body);
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
        //console.log("store",store);
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



export const allbus = async (req, res) => {
    try {
        const { ownerId } = req.params;
        // // // //console.log(ownerId);
        const stores = await Store.find({ id: ownerId }).select('-createdAt').select('-__v').select('-updatedAt').select('-followerslist').select('-followerscount').select('-pincode').select('-longitude').select('-latitude').select('-bookedtimes');
        // // // //console.log(stores);;
        // // // //console.log(stores);;
        // // // //console.log(stores);
        stores.forEach(element => {
            // // // //console.log(element);
            element.type = element._id;
        });
        // // // //console.log(stores);
        res.status(201).json(stores);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const allcollection = async (req, res) => {
    try {
        const { ownerId } = req.params;
        // // // //console.log(ownerId);
        const stores = await Store.find({ id: ownerId }).select('-createdAt').select('-__v').select('-updatedAt').select('-followerslist').select('-followerscount').select('-pincode').select('-longitude').select('-latitude').select('-bookedtimes');
        // // // //console.log(stores);;
        // // // //console.log(stores);;
        // // // //console.log(stores);
        stores.forEach(element => {
            // // // //console.log(element);
            element.type = element._id;
        });
        // // // //console.log(stores);
        res.status(201).json(stores);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
