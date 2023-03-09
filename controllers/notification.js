import pkg from 'firebase-admin';
import Deviceid from "../models/Deviceid.js";
import Noti from "../models/Noti.js";

// const { initializeApp, credential: _credential, messaging } = pkg;

var serviceAccount = {
    "type": "service_account",
    "project_id": "outq-dev",
    "private_key_id": "6bbd6ca26e3bf35a681cd44057a435f10096bcd2",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXJRmZodNMT8xJ\nAXZ2rExOI/CpTTfh7zEdFmGMD/PQjxBZxV/zvUi3Sv0MScdxAOtayiis8xkp+r4O\nsQfcAgkuyo5143KwmxnM/xUdhs83C2aQBcc+9PXFULzBdndU0ntc2528Q6R4kWmi\nxuda1ghPywUVPb+ctWM9wnh5/NzkRELE0vcviFuaNu8WHs4+BFiXcgSYkma5CVqO\niftUR+s+Gss4xCgK/1rS046Bk0qyh1ndXRqDVoDgylSjzdHZ/+TAcqw+nxWxfTju\nxRziLgiwftiyOrXNPBtnbSNxCezu7U8NZyr0w2X7TeArIe3K7z6PoHzl6ERgnfcz\nqowyTau7AgMBAAECggEAJ40ad7PYNF83HvS14nsqS/MvevBHJbHjRYWnySflmqGy\nT86JJTXW+FtAydGGaK/SlI41jBXkumLuLaU93KRDK+bw6Zs2qmDZDWaXayYtUeE2\nqaNmTZya0ftVt/sfVOic5SU6ijGlOsUAtnv6bCiMvp6EALOpVhXCeMgXfdWOhifw\nECVy5q5Mal6p68DMQqqDKN06yse1MlTeuPQjqO6c99NI1OmJ/CQ1GG+cD3uCdz0r\n6S/3X9ByBQNJmXuIgbzaOnWDtFLAQaXwIDXxK8+GDkcgT5kO2CFVN06GQZx5qEec\n8dfUX6THUQBhnPfNnFi7O4IhVmtsGK8Ukv6jihb9gQKBgQDvdtq26h9koU0KK1Bp\nzJI5WcZ7WNL6DBNK18o8oO71CM+uUnTItCc7dyaevewwij1nrtccQGHYBtV/rCn+\nxo+MaQOD+5gCB+N9ODKTLXex1FZnq1k2jKyCqPjaNZMMBHOXHJzDT73a5Pryk+cs\nq/xMb2+QxjWtmNVik+H8mMbONQKBgQDmAFay7KbGLAOkGdWzlVbM5UTJVXPzbog6\nQbzB0pOm24j5XkUyV5AFl2kvstVMEzfcSc8TWDU3Ly1MBtRmAKBd9zopEp0/bPQg\n5QUUYLlcAZ1sH9b9snLBW3FHMIb1Npo+tYioa7YufdoulP1VmeJ3TiTAFehAVwPL\nUNdhhJCQLwKBgQCtkfngYX0VxLEBsPmdZlGKzl7Go1BxO/Vz50vIfGIYLCXU1iGe\nJK7XNHtCzqj3Wgw+LgXvjV8eZX21CAZ8jFIaVTfeH6xDtJIY/nXyJh+/PwjOJe4J\nUxfrsSyHhhOqv0NFgdDC5PbZReX7lGcZAyRiBtfYGUNpLAFnbYd9PwPDDQKBgA/r\nRhTsPD7LHRVmlFvxoihcVf55Y6UdqWAe3KmtoXqTB0/7Ll7loJpCeI1Mm2bAjcU5\ndpOoL0a6hTAV6O2GbZMTYXsmRqv1JpCASXG3oBy2H+cz7PVyPG8VnSmIOk8OkG52\nsha2Hc3p+AfxV/dsxzfquLBy07hgTWrtFXsyaa8RAoGADmiCjMgAhMo4ZiAihK6m\nq61DPhFog8kn77U02Ldh4Xb5quYsyIIXegUpmAX+Kc6oUDgzhBfkxTt+QedDX8gm\n6vtKzatjhAd8IDSmZyKjrxvi5DSJt/+M+AiQ43P5o7rzKjFZmrQCMfSNL4o/Q5vY\n6SDjFcaAGagFnWtgsFjkQJg=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ong27@outq-dev.iam.gserviceaccount.com",
    "client_id": "113369501055061444288",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ong27%40outq-dev.iam.gserviceaccount.com"
  }
  

// var serviceAccount = {
//     "type": "service_account",
//     "project_id": "outqapp",
//     "private_key_id": "dbe327057612f03c371c5b50c40ddf531e5cd50c",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIsNkwS/vyplHi\ntN/kJeB2M/0C5F5toX/gwS7Rqew5fwCElgQhHGr9jXyyxpmOoRQlgfQ1Lk9vj6Qd\nzDgjKQ5tZcgEgfH1cZqwGW0pUOBhealQmBQL5JCx0RXhXqoeJFNAboFJQvdY+DoY\nhlBaGRcgxtXLnlrF3i1Bc8JHHaCCbMEY2OmcmARtkQEOOqNBi/Ze7Tpw7p1ZF/Qi\nmm28NNoF9na2BVnYWe1+e5uWDTlBudo77yE0Wg4V0Yd6eARYhEKz7OHCAzZm6NlB\nHreQ7QQYwJ65UyabpRFmimL0ZYoQ2KPqdW/JbFdkRZ1sZ99n/IOu06kvUdAnY/O/\n8XCkwGbZAgMBAAECggEADYxED9Vupon2yNdNWUv7SU980DIAHpDX8/a77+MeM3Vw\n4K0gjecAC/9+AF2Ve9eWPL/3RJMh7ACQ44K9SWuvRyWnU909KxoRB2airrbV0Y69\nJi0rW/Ar78Jod+SEQcZRqRhXTvhKgALl0nECwfT5UY5KsX+5AKwydugsddDjXIUs\nr0WLEbAqK8qVEjV2TzvX01UvGcTiJyPXRzZ8xulI2GGV04vYHpMO0b1h//MnRe0V\nX/rMHgtUzZm1vaPLQoKkhwy43VHNrITIt2CBMIx4HsAzQXgkap2FmREU8Vhn/lgm\n/FXB5rIyQWsWV200uilZ0CuLQWVNFwXETI53O9CafwKBgQDnQ3MnZmOUzSV+O7DS\nCYDqxFgOHunZnSBn6J4M2j6CSJm2W+6EPsINbUDfCBanXoxHAVRFs2mqUgHGg0B8\nA5jaxkpNjV7R7gsXrluzrldK7C84SaaxZqsU++Grn8ztrVlw4aCuuH7f6nDKft67\nTSh3An04VrKV/L/0Cq1AXbmqdwKBgQDeKD7dLDDCmy2iKIDHnxcRZjwJmFV9SJE1\n2gqm88L0TOrTDbzHXEkl1YV5LAT8AWG2YyXhNmJcl/0KoqCcGA1hLQyZs0cHfraC\nwKoBIisPgQzXzSFDUDIIw/Y0g4hXVS+2tGwfVEuCFlpZcQxWuWP1cIipUy8vHXcv\nEgHNQYJ9LwKBgQCXX2XzhyhtUK5W5xlBEelpQaVlcMSepSN+ABvby8qYmo7Kd3gy\n5aU9BqMsmW3Clbd6Dpurl9j1HAJ/fo/p3KzjnmEqS/uhq49lK8JoZRhMOTZbQJI0\nkkAvVwOKw+luNUZTBcyYMLkTNbAoS0zdCo8O/vkZtF3moO6//XETrYWG1wKBgAjs\nBNpNFAg8wzBoAAQEV6DTQkYAYC6P44UOJK9fysyU6jlfq901z5o9YQbkxa55P7tb\ncAIDdR/S2s66iUi7jo4AiSkDEi8y35GQu0MgZCpTPHjOPC+/4MKJXDHvtmILgccM\np+r6L64hx68f4yb4exM4WcSzGooB3O9/AaOEpgDxAoGBAMsOCxG0qt8u418zg3hl\nv1deoD6862HnpBFqdXuye+PqjYRRcRNaJISHAYcfvlkSKDtTk+XlD/h5l4LIRGNY\nYawDBo9iFfu+pr6NS3JDhhUP2P47jHROiHqeDlAVKPafQChCT1I0e0WUHo9ye+VK\ncMdio2T5fr22/7Vn01JrFw8c\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-1qymi@outqapp.iam.gserviceaccount.com",
//     "client_id": "106612334582680080787",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1qymi%40outqapp.iam.gserviceaccount.com"
// }

pkg.initializeApp({
    credential: pkg.credential.cert(serviceAccount),
});

export const sendNoty= (data)=>{
    const message = {
        token: data.token,
        android: {
            priority: 'high'
        },
        notification: {
            title:data.title,
            body: data.body,
        },
    };
    pkg.messaging().send(message)
        .then((response) => {
            // console.log('Successfully sent message:', response);
            return { response: response, status: true };
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            return { response: error, status: false };
        });
}

export const notify = async (req, res) => {
    // console.log('called');
    try {
        const message = {
            token: 'eM_VefAKTo-jeAGU-mnBpk:APA91bHX2qtPjZR82VhnWiPbYQFN0gIDeG3oqHKTc3UfEkpMzViKqZtZlnF0jBadF-3XW6ipUKID3yc-n0O-zNg5rmO_4r7Ha1YL3SHTil3QKclUryMRQf3Wm5LBB2NE3C_ik_9a5P96',
            // token: 'es44pBdqTwaYXe8SuHUedS:APA91bFUhb7qnmu77lIHqbaqhWiSzFDkQ5SMJ2l3cPtXhsRbzrSBIL5pOLnk6pxx6c06muKWGUWGVU15fbk8PE_ZrdyRPvxMGa1pi3NY-Vmf5p9H4aRECMcZ0zfQugAecXRPgI2ccLvT',
            notification: {
                title: 'Heck',
                body: '',
                image:'https://lh3.googleusercontent.com/CqeI58Upe78XvaUeIqxKCJW3idqEjhebL9oKqLkDBjAwwZoB_DPm-tkFNpveWqSHmhq9n-OIJbvjlXtAF8lLAD5Hoz6pb245K4S87Gzw'
            },
            "android": {
                "priority": 'high'
            },
        };

        pkg.messaging().send(message)
            .then((response) => {
                // console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });

        res.status(201).json(message);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};


export const ocreate = async (req, res) => {
    // console.log('called');
    try {
        let { storeid } = req.params;
        let notis = await Noti.find({"storeid":storeid})
        res.status(201).json(notis);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const ucreate = async (req, res) => {
    // console.log('called');
    try {
        let { userid } = req.params;
        let notis = await Noti.find({"userid":userid})
        res.status(201).json(notis);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};











export const userFetch = async (req, res) => {
    // console.log('called');
    try {
        let { userid, deviceid } = req.params;
        const newDeviceid = new Deviceid({
            deviceid: deviceid,
            id: userid,
            type: "user",
        });
        let newdeviceid = newDeviceid.save();
        res.status(201).json(newdeviceid);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const ownerFetch = async (req, res) => {
    // console.log('called');
    try {
        let { storeid, deviceid } = req.params;
        const newDeviceid = new Deviceid({
            deviceid: deviceid,
            id: storeid,
            type: "store",
        });
        let newdeviceid = newDeviceid.save();
        res.status(201).json(newdeviceid);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};
