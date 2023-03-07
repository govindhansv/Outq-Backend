
import Store from "../models/Store.js";
import Order from "../models/Order.js";

/* LOGGING IN */
export const fetch = async (req, res) => {
  console.log('dash called');
  try {
    const { storeid } = req.params;
    const dateString = new Date();
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toISOString().slice(0, 10);
    let today = formattedDate;
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const ydateObj = new Date(yesterday);
    const yformattedDate = ydateObj.toISOString().slice(0, 10);

    const torders = await Order.find({ "storeid": storeid, "date": today, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    const yorders = await Order.find({ "storeid": storeid, "date": yformattedDate, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let growth = ((torders.length - yorders.length ) / torders.length) * 100;
    growth = growth.toFixed(2);
   
    res.status(201).json({ t: torders.length, y: yorders.length, growth: growth });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};
