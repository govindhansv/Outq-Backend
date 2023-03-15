
import Store from "../models/Store.js";
import Service from "../models/Service.js";
import Order from "../models/Order.js";
import { DateTime } from 'luxon';

/* LOGGING IN */
export const services = async (req, res) => {
  try {
    const { storeid } = req.params;

    let store = await Store.findById(storeid);

    let services = await Service.find({ "storeid": storeid });
    // console.log(services);
    let serviceNames = services.map(service => service.name);
    let serviceIds = services.map(service => service._id.toString());
    console.log(serviceNames);
    console.log(serviceIds);
    let servicesdata = [];
    for (let i = 0; i < serviceIds.length; i++) {

      let orders =await Order.find({ "serviceid": "64083378cd603a2fb02cdc22" })
        .countDocuments()
        .then(count => {
          // console.log(`There are ${count} orders for service ID ${serviceIds[i]}`);
        })
        .catch(error => {
          console.error(error);
        });
      console.log(orders);
      servicesdata = servicesdata.concat(orders);
    }

    res.json(servicesdata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};

export const fetch = async (req, res) => {
  console.log('dash called');
  try {
    const { storeid, today, yesterday } = req.params;
    console.log(today, yesterday);
    const torders = await Order.find({ "storeid": storeid, "date": today, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    const yorders = await Order.find({ "storeid": storeid, "date": yesterday, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let growth = ((torders.length - yorders.length) / torders.length) * 100;
    growth = growth.toFixed(2);
    console.log(torders);
    console.log(yorders);


    let ttotalorders = await Order.find({ "storeid": storeid, "date": today }).select('-createdAt').select('-__v').select('-updatedAt');
    let tsucessorders = await Order.find({ "storeid": storeid, "date": today, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let tfailureorders = await Order.find({ "storeid": storeid, "date": today, "status": "Cancelled" }).select('-createdAt').select('-__v').select('-updatedAt');
    if (ttotalorders.length  = 0) {
      
    } else {
      ttotalorders = 0;
    }
    if (tsucessorders.length  = 0) {
      
    } else {
      tsucessorders = 0;
    }
    if (tfailureorders.length  = 0) {
      
    } else {
      tfailureorders = 0;
    }
    console.log(ttotalorders);
    let totalorders = await Order.find({ "storeid": storeid }).select('-createdAt').select('-__v').select('-updatedAt');
    let sucessorders = await Order.find({ "storeid": storeid, "status": "Success" }).select('-createdAt').select('-__v').select('-updatedAt');
    let failureorders = await Order.find({ "storeid": storeid, "status": "Cancelled" }).select('-createdAt').select('-__v').select('-updatedAt');

    let storedata = await Store.findById(storeid);
    let followers = storedata.followerslist.length;

    res.status(201).json({ t: torders.length, y: yorders.length, growth: growth,followers:followers,orders:[ttotalorders,tsucessorders,tfailureorders] });

    // let order = { "_id": { "$oid": "640836048d2f97da954b7880" }, "start": "9:00", "end": "10:00 AM", "storeid": "64082ee0cd603a2fb02cdbc6", "serviceid": "64083378cd603a2fb02cdc22", "userid": "6408353d8d2f97da954b7861", "price": "3000", "date": "2023-03-08", "servicename": "Hydra facial cleanup", "storename": "SKY BEAUTY CARE ", "status": "Success", "__v": { "$numberInt": "0" } }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
};
