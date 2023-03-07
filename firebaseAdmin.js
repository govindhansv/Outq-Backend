import { initializeApp, credential as _credential, messaging } from 'firebase-admin';
import serviceAccount from './outqapp-firebase-adminsdk-1qymi-dbe3270576.json';

initializeApp({
    credential: _credential.cert(serviceAccount),
});

const message = {
    notification: {
        title: 'Notification title',
        body: 'Notification body',
    },
    token: 'FCM registration token',
};

messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
