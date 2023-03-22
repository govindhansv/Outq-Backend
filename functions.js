import geolib from "geolib";
import Store from "./models/Store.js";

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const distance = geolib.getDistance(
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 }
    );
    return distance;
}

export function getNearbyShops(userLat, userLon, maxDistance) {
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