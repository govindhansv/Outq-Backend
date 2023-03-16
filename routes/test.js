import express from "express";
import Service from "../models/Service.js";

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
//             // // console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//             // // console.log('Error sending message:', error);
//         });
//     } catch (error) {
//         // // console.log(error);
//     }
// }



const router = express.Router();


router.get("/", (req, res) => {
    // // console.log('called');
    res.status(201).json({ message: "API Working properly fek guys... " });
});



router.get("/testing", async (req, res) => {
    var time = "10:20 PM";
   
    // var AMPM = time.match(/\s(.*)$/)[1];
    // // // console.log("10 " + AMPM);
    var newTime = new Date(new Date("1970/01/01 " + time).getTime() + 180 * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    // // console.log(newTime);
    //     str2 = "05:10";

    // if (str1 > str2)
    //     // // console.log("Time 1 is later than time 2");
    // else
    //     // // console.log("Time 2 is later than time 1");
    
});
router.get("/db", async (req, res) => {
    let allservices = await Service.find({})

    res.status(201).json(allservices);
});


router.get("/reg", async (req, res) => {
    try {
        const stores = await Test.find();
        // // console.log(stores);
        res.status(201).json(stores);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
});

router.post("/reg", async (req, res) => {
    try {
        // // console.log('called');
        // // console.log(req.body);
        const {
            name, pswd
        } = req.body;

        const newTest = new Test({
            name, pswd
        });

        const store = await newTest.save();
        const stores = await Test.find();
        // // console.log(stores);

        res.status(201).json({ data: store });
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
});


export default router;
