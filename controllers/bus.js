import bcrypt from "bcrypt";
import Bus from "../models/Bus.js";
import BusOwner from "../models/BusOwner.js";
import Collection from "../models/Collection.js";


/* REGISTER USER */
export const register = async (req, res) => {
  console.log('called');
  try {
    const {
      // firstName,
      // lastName,
      name,
      email,
      pswd,
      // picturePath,
      // friends,
      deviceid,
      phone,

    } = req.body;

    // //console.log(req.body);
    // //console.log(name,email,pswd);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pswd, salt);

    const newBusOwner = new BusOwner({
      // firstName,
      // lastName,
      name,
      email,
      pswd: passwordHash,
      // picturePath,
      // friends,
      deviceid,
      phone,
      cpswd: pswd
      // viewedProfile: Math.floor(Math.random() * 10000),
      // impressions: Math.floor(Math.random() * 10000),
    });
    const savedBusOwner = await newBusOwner.save();
    console.log(savedBusOwner);

    let userid = savedBusOwner._id.toString();
    // //console.log(userid);
    res.status(201).json([{ "id": userid }]);
    // res.status(201).json(savedUser);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  //console.log('called');
  try {
    const { email, pswd } = req.body;
    console.log(email, pswd);
    const user = await BusOwner.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. " });
      console.log(' uaser not found');
    }

    const isMatch = await bcrypt.compare(pswd, user.pswd);
    console.log(isMatch);
    if (!isMatch) {
      console.log(' invalid');
      return res.status(400).json({ msg: "Invalid credentials. " });
    } else {
      console.log(' valid');
      let userid = user._id.toString();
    // let userlocation = user._id;
    console.log(userid);
    res.status(201).json([{ "id": userid }]);
      
    }

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    // res.status(201).json({ token, user });


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const driverlogin = async (req, res) => {
  //console.log('called');
  try {
    const { id, pswd } = req.body;
    //console.log(email, pswd);
    const user = await Bus.findOne({ "id": id });
    console.log(user);
    if (!user) {
      console.log(' uaser not found');
      return res.status(400).json({ msg: "Bus does not exist. " });
    }

    // const isMatch = await bcrypt.compare(pswd, user.pswd);
    //console.log(isMatch);
    if (pswd != user.pswd) {
      return res.status(400).json({ msg: "Invalid credentials. " });
      //console.log(' invalid');
    } else {
      let userid = user._id.toString();

      res.status(201).json([{ "id": id }]);
    }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    // res.status(201).json({ token, user });

    // let userlocation = user._id;
    // //console.log(userid);
  } catch (err) {
    console.log(err);
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
      startplace,
      endplace,
      ownerid
    } = req.body;

    const start = JSON.parse(startplace);
    const end = JSON.parse(endplace);
    const owner = await BusOwner.findById(ownerid);

    const newBus = new Bus({
      name,
      number,
      id,
      pswd,
      startplace:start,
      endplace:end,
      ownerid: owner._id,
      busid: ""
    });

    const savedBus = await newBus.save();
    // const stores = await Store.find({ownerId:ownerId});
    console.log("store", savedBus);
    // res.status(201).json({ store:store, stores:stores });
    res.status(201).json({ success: true, bus: savedBus });
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

export const createcollection = async (req, res) => {
  console.log(' called ');
  try {
    console.log(req.body);
    let {
      busid,
      amount,
      date,
    } = req.body;
    const bus = await Bus.findOne({ "id":busid });
    console.log(bus);
    const newCollection = new Collection({
      busid,
      name:bus.name,
      ownerid: bus.ownerid,
      amount,
      date,
    });

    const store = await newCollection.save();
    console.log(store);

    res.status(201).json({ success: true, store: store });
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

export const allownerbus = async (req, res) => {
  try {
    const { ownerId } = req.params;
    // // // //console.log(ownerId);
    const stores = await Bus.find({ "ownerid": ownerId }).select('-createdAt').select('-__v').select('-updatedAt');
    // // // //console.log(stores);;
    // // // //console.log(stores);;
    // // // //console.log(stores);
    stores.forEach(element => {
      // // // //console.log(element);
      element.busid = element._id;
    });
    // // // //console.log(stores);
    res.status(201).json(stores);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const allbus = async (req, res) => {
  try {
    const stores = await Bus.find({}).select('-createdAt').select('-__v').select('-updatedAt');

    stores.forEach(element => {
      element.busid = element._id;
    });
    res.status(201).json(stores);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const allcollection = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const stores = await Collection.find({ "ownerid": ownerId }).select('-createdAt').select('-__v').select('-updatedAt');
    stores.forEach(element => {
      element.cid = element._id;
    });
    console.log(stores);
    res.status(201).json(stores);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE SERVICES

export const delBus = async (req, res) => {
  console.log(' called');
  try {
      const { id } = req.params;
      console.log(id);
      Bus.deleteOne({ _id: id },
          function (err, data) {
              if (err) {
                  res.status(201).json({ status: false, err: err });
              }
              else {
                  res.status(201).json({ status: true, data: data });
              }
          });
  } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
  }
};
