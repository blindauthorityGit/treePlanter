import getDistance from "./getDistance";

export default function findClosestMarker(marker) {
    navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        let closestDistance = Infinity;
        let closestMarker = null;

        data.forEach((marker) => {
            const markerLat = marker.geometry.coordinates[1];
            const markerLng = marker.geometry.coordinates[0];
            const distance = getDistance(userLat, userLng, markerLat, markerLng);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestMarker = marker;
            }
        });

        console.log(closestMarker);
        map.flyTo({
            center: closestMarker.geometry.coordinates,
            zoom: 15,
            speed: 0.8,
        });
    });
}
