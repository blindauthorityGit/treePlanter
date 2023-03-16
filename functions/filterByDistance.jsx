export default function filterByDistance(coordinates, center, distance) {
    console.log("Fired");
    const filtered = coordinates.filter((coord) => {
        const [lng, lat] = coord;
        const [centerLng, centerLat] = center;
        const dLng = ((lng - centerLng) * Math.PI) / 180;
        const dLat = ((lat - centerLat) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((centerLat * Math.PI) / 180) *
                Math.cos((lat * Math.PI) / 180) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = 6371 * c; // Earth's radius in km
        console.log(d, d <= distance);
        return d <= distance;
    });
    console.log(filtered);
    return filtered;
}
