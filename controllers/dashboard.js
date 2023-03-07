
import Store from "../models/Store.js";
import Order from "../models/Order.js";

/* LOGGING IN */
export const fetch = async (req, res) => {
  console.log('dash called');
  try {
    const { storeid,today,yesterday } = req.params;
    console.log(today,yesterday);
    const torders = await Order.find({ "storeid": storeid, "date": today, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    const yorders = await Order.find({ "storeid": storeid, "date": yesterday, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let growth = ((torders.length - yorders.length ) / torders.length) * 100;
    growth = growth.toFixed(2);
   console.log(torders);
   console.log(yorders);
    res.status(201).json({ t: torders.length, y: yorders.length, growth: growth });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};
