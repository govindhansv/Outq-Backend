import express from "express";
import Store from "../models/Store.js";
import Service from "../models/Service.js";
import geolib from 'geolib';
import Error from "../models/Err.js";


// ERROR MANAGEMENT
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const router = express.Router();

Sentry.init({
  dsn: "https://5e2497b7fc5b4156a4acb09f4e44ff5c@o4504893974642688.ingest.sentry.io/4504893996007424",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

router.get("/err", async (req, res) => {

    // setTimeout(() => {
        // try {
            console.log('no err');
            // console.log(id);
        // } catch (e) {
        //     Sentry.captureException(e);
        // } finally {
        //     transaction.finish();
        // }
    // }, 99);
});

// import { initializeApp, credential as _credential } from "firebase-admin";
// import serviceAccount from "./outq-2b5af-firebase-adminsdk-xgart-9ae70eeb27.json?type=json";


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// }); 

// const message = {
//     token: 'USER_DEVICE_TOKEN',
//     notification: {
//         title: 'New Appointment',
//         body: 'You have a new appointment scheduled.',
//     },
// };




// export async function sendNotificationEventCreation() {
//     try {
//         var payload = { notification: { title: 'FCM using flutter and node js', body: 'we are fine now' }, data: { click_action: "FLUTTER NOTIFICATION_CLICK" } }
//         admin.messaging().send(message)
//         .then((response) => {
//             // // //console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//             // // //console.log('Error sending message:', error);
//         });
//     } catch (error) {
//         // // //console.log(error);
//     }
// }





router.get("/", (req, res) => {
    // // //console.log('called');
    Service.find().populate('storeid').exec((err, services) => {
        if (err) {
            console.error(err);
            return;
        }

        // Loop through the services and add the latitude and longitude fields
        services.forEach(service => {
            //console.log(service);
            service.latitude = service.storeid.latitude;
            service.longitude = service.storeid.longitude;
        });

        Service.bulkWrite(services.map(service => ({
            updateOne: {
                filter: { _id: service._id },
                update: { $set: { latitude: service.latitude, longitude: service.longitude } }
            }
        })), (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            //console.log(result);
        });

        // //console.log(services);
    });

    res.status(201).json({ message: "API Working properly fek guys... " });
});



router.get("/testing", async (req, res) => {
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const distance = geolib.getDistance(
            { latitude: lat1, longitude: lon1 },
            { latitude: lat2, longitude: lon2 }
        );
        return distance;
    }

    function getNearbyShops(userLat, userLon, maxDistance) {
        return Store.find({}).lean().exec().then((shops) => {
            // Calculate the distance between each shop and the user's location
            // //console.log(shops);
            shops.forEach((shop) => {
                shop.distance = calculateDistance(
                    userLat,
                    userLon,
                    shop.latitude,
                    shop.longitude,
                );
                //console.log(shop.distance);
            });

            // Sort the shops based on their distance
            shops.sort((a, b) => a.distance - b.distance);

            // Filter the shops based on the maximum distance
            const nearbyShops = shops.filter((shop) => shop.distance <= maxDistance);

            return nearbyShops;
        });
    }
    //console.log("result ");
    //console.log(await getNearbyShops(9.1597267,76.7176525,100000000));

});

router.get("/db", async (req, res) => {
    try {
        let allservices = await Service.find({ id })
        res.status(201).json(allservices);
    } catch (err) {
        const newErr = new Error({ any: err });
        const error = await newErr.save();
        res.status(409).json({ error: err.message, err: error });
    }
});



router.get("/reg", async (req, res) => {
    try {
        const stores = await Test.find();
        // // //console.log(stores);
        res.status(201).json(stores);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
});

router.post("/reg", async (req, res) => {
    try {
        // // //console.log('called');
        // // //console.log(req.body);
        const {
            name, pswd
        } = req.body;

        const newTest = new Test({
            name, pswd
        });

        const store = await newTest.save();
        const stores = await Test.find();
        // // //console.log(stores);

        res.status(201).json({ data: store });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
});


export default router;
