import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";
import Store from "../models/Store.js";

// HBS TESTING
export const getreg = async (req, res) => {
  res.render('register');
};
export const getlogin = async (req, res) => {
  res.render('login');
};
// HBS TESTING

/* REGISTER Owner */
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      pswd,
      deviceid
    } = req.body;
    // // console.log(req.body);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pswd, salt);

    const newOwner = new Owner({
      name,
      email,
      password: passwordHash,
      deviceid

    });
    
    const savedOwner = await newOwner.save();
    let ownerid = savedOwner._id.toString();
    // console.log(ownerid);
    res.status(201).json([{"id":ownerid}]);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  // console.log('called');

  try {
    const { email, pswd } = req.body;
    const owner = await Owner.findOne({ email: email });
    if (!owner) return res.status(400).json({ msg: "Owner does not exist. " });
    
    const isMatch = await bcrypt.compare(pswd, owner.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    
    let ownerid = owner._id.toString();
    const store = await Store.findOne({ id: ownerid });
    let storeid = store._id.toString();
    // console.log(ownerid);
    // console.log(store);
    res.status(201).json([{"id":ownerid,"storeid":storeid}]);
    // res.status(200).json({ token, owner });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "error true", error: err.message });
  }
};
