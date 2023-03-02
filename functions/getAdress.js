export const fetchAddressFromCoordinates = async (coordinates) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`
    );
    const data = await response.json();
    const address = data.features[0].place_name;

    return address;
};
