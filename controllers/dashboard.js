
import Store from "../models/Store.js";
import Service from "../models/Service.js";
import Order from "../models/Order.js";
import { DateTime } from 'luxon';

/* LOGGING IN */
export const services = async (req, res) => {
  try {
    let { storeid } = req.params;
    storeid = "64082ee0cd603a2fb02cdbc6";

    // let store = await Store.findById(storeid);

    let services = await Service.find({ "storeid": storeid }).select('_id').select('name');
    // console.log(services);
    let serviceNames = services.map(service => service.name);
    let serviceIds = services.map(service => service._id.toString());
    // console.log(serviceNames);
    // console.log(serviceIds);
    // let servicesdata = [];
    // for (let i = 0; i < serviceIds.length; i++) {
      let orderCounts = await Promise.all(serviceIds.map(async (serviceId, index) => {
        const count = await Order.aggregate([
          { $match: { serviceid: serviceId } },
          { $count: "count" }
        ]);
        return { name: serviceNames[index], count: count[0]?.count || 0 };
      }));
    orderCounts  = orderCounts.sort((a, b) => a.count - b.count);
    // servicesdata = orderCounts.filter(({ count }) => count > 0);
    // console.log(" sc", servicesdata);
    // for (let i = 0; i < serviceIds.length; i++) {
    //   let orders = await Order.find({ "serviceid": serviceIds[i] }).countDocuments()
    //   // console.log(orders);
    //   servicesdata = servicesdata.concat([{ name: serviceNames[i], count: orders }]);
    // }
    // console.log(servicesdata);
    res.json(orderCounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};

export const fetch = async (req, res) => {
  console.log('dash called');
  try {
    let { storeid, today, yesterday } = req.params;
    storeid = "64082ee0cd603a2fb02cdbc6";
    // console.log(today, yesterday);
    const torders = await Order.find({ "storeid": storeid, "date": today, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    const yorders = await Order.find({ "storeid": storeid, "date": yesterday, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let growth = ((torders.length - yorders.length) / torders.length) * 100;
    growth = growth.toFixed(2);
    // console.log(torders);
    // console.log(yorders);


    let ttotalorders = await Order.find({ "storeid": storeid, "date": today }).select('-createdAt').select('-__v').select('-updatedAt');
    let tsucessorders = await Order.find({ "storeid": storeid, "date": today, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let tfailureorders = await Order.find({ "storeid": storeid, "date": today, "status": "Cancelled" }).select('-createdAt').select('-__v').select('-updatedAt');
    if (ttotalorders.length >= 0) {

    } else {
      ttotalorders = 0;
    }
    if (tsucessorders.length >= 0) {

    } else {
      tsucessorders = 0;
    }
    if (tfailureorders.length >= 0) {

    } else {
      tfailureorders = 0;
    }

    // console.log(ttotalorders);
    // let totalorders = await Order.find({ "storeid": storeid }).select('-createdAt').select('-__v').select('-updatedAt');
    // let sucessorders = await Order.find({ "storeid": storeid, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    // let failureorders = await Order.find({ "storeid": storeid, "status": "Cancelled" }).select('-createdAt').select('-__v').select('-updatedAt');

    let storedata = await Store.findById(storeid);
    let followers = storedata.followerslist.length;
    // console.log(storedata);
    // console.log(followers);
    if (followers >= 0) {

    } else {
      followers = 0;
    }
    console.log(
      " followersw", followers
    );


    

    res.status(201).json({ t: torders.length, y: yorders.length, growth: growth, followers: followers, orders: [ttotalorders, tsucessorders, tfailureorders]});

    // let order = { "_id": { "$oid": "640836048d2f97da954b7880" }, "start": "9:00", "end": "10:00 AM", "storeid": "64082ee0cd603a2fb02cdbc6", "serviceid": "64083378cd603a2fb02cdc22", "userid": "6408353d8d2f97da954b7861", "price": "3000", "date": "2023-03-08", "servicename": "Hydra facial cleanup", "storename": "SKY BEAUTY CARE ", "status": "Success", "__v": { "$numberInt": "0" } }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};
