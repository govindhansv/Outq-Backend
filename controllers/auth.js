import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  // console.log('called');
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
      deviceid
    } = req.body;

    // console.log(req.body);
    // console.log(name,email,pswd);
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
      deviceid
      // viewedProfile: Math.floor(Math.random() * 10000),
      // impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();

    let userid = savedUser._id.toString();
    // console.log(userid);
    res.status(201).json([{ "id": userid }]);
    
    // res.status(201).json(savedUser);
  } catch (err) {
    // console.log("err",err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  // console.log('called');
  try {
    const { email, pswd } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(pswd, user.pswd);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    // res.status(200).json({ token, user });
    
    let userid = user._id.toString();
    // console.log(userid);
    res.status(201).json([{ "id": userid }]);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const update = async (req, res) => {
  // console.log('called');
  try {
    const { location, longitude, latitude, pincode } = req.body;
    // console.log(location, longitude, latitude, pincode,req.params.userid);
    User.findByIdAndUpdate(req.params.userid,
      { $set: req.body },
      function (err, data) {
          if (err) {
              res.status(501).json({ status: false, err: err });
          }
          else {
              res.status(201).json({ status: true, data: data });
          }
      });
    // res.status(201).json([{ "id": userid }]);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: true });
  }
};
