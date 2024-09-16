const generateRandomTrees = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Example GeoJSON structure for areas with random tree counts and colors
const areaGeoJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                id: "1",
                name: "Lustgarten",
                treesPlanted: generateRandomTrees(10, 20),
                treesMax: 20,
                color: randomColor(),
                sum: 2164,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.400720090477648, 52.51834955709066],
                        [13.399623507705769, 52.519397419202534],
                        [13.39769839572753, 52.51929362265591],
                        [13.398835592676846, 52.51780831663595],
                        [13.39935545413934, 52.51786763098383],
                        [13.399802210083408, 52.51801591650269],
                        [13.400720090477648, 52.51834955709066],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            properties: {
                id: "2",
                name: "Marx-Engels-Forum",
                treesPlanted: generateRandomTrees(20, 40),
                treesMax: 40,
                color: randomColor(),
                sum: 1464,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.404212927368746, 52.517239755312886],
                        [13.406077118105628, 52.518057802581694],
                        [13.406682269339086, 52.51834448622586],
                        [13.40665383941598, 52.51846064199722],
                        [13.404801832931696, 52.51973586385901],
                        [13.402702079994526, 52.51875967987735],
                        [13.404212927368746, 52.517239755312886],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            properties: {
                id: "3",
                name: "Großer Tiergarten",
                treesPlanted: generateRandomTrees(20, 120),
                treesMax: 120,
                color: randomColor(),
                sum: 7164,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.376141409749437, 52.51246093875508],
                        [13.377139172543963, 52.515362040252626],
                        [13.375947400317102, 52.516087285700365],
                        [13.376862016211817, 52.51704863912201],
                        [13.376501712981366, 52.517588337087176],
                        [13.370681430012382, 52.51765579886657],
                        [13.36935107962023, 52.51728475779757],
                        [13.361812427394312, 52.5175714716259],
                        [13.356657319622144, 52.51667759292562],
                        [13.354744940932932, 52.51693057930842],
                        [13.351003330452755, 52.5148560479673],
                        [13.350421302157201, 52.51340550445718],
                        [13.351834799449193, 52.50976206773154],
                        [13.358652845211196, 52.50993075202646],
                        [13.363641659185276, 52.50993075202646],
                        [13.375559381452405, 52.51195491306342],
                        [13.376141409749437, 52.51246093875508],
                    ],
                ],
            },
        },
        // Add more areas with the same structure
        {
            type: "Feature",
            properties: {
                id: "4",
                name: "Bebelplatz",
                treesPlanted: generateRandomTrees(20, 25),
                treesMax: 25,
                color: randomColor(),
                sum: 864,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.395186041212867, 52.517112291392465],
                        [13.39535215336113, 52.51637582114586],
                        [13.396016601954273, 52.51640470256453],
                        [13.395779298885088, 52.51717005324258],
                        [13.395186041212867, 52.517112291392465],
                    ],
                ],
            },
        },
        // Add more areas with the same structure
        // Add more areas with the same structure
        {
            type: "Feature",
            properties: {
                id: "5",
                name: "Unter den Linden",
                treesPlanted: generateRandomTrees(20, 45),
                treesMax: 25,
                color: randomColor(),
                sum: 1210,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.385702035593738, 52.51846844690715],
                        [13.386605121838869, 52.51115665904169],
                        [13.391748786973466, 52.51139562558879],
                        [13.390315628366551, 52.51885072914118],
                        [13.385702035593738, 52.51846844690715],
                    ],
                ],
            },
        },
        // Add more areas with the same structure
        {
            type: "Feature",
            properties: {
                id: "6",
                name: "Monbijoupark",
                treesPlanted: generateRandomTrees(20, 55),
                treesMax: 25,
                color: randomColor(),
                sum: 1210,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.394261719178076, 52.52260169197797],
                        [13.400465529034989, 52.52135936863118],
                        [13.400229941319253, 52.522183606312495],
                        [13.399052002738443, 52.522458348769646],
                        [13.398168548802687, 52.52236278637059],
                        [13.398463033447598, 52.52298393824739],
                        [13.398600459615352, 52.5232467306281],
                        [13.395204070042041, 52.52434566355092],
                        [13.394261719178076, 52.52260169197797],
                    ],
                ],
            },
        },
        // Add more areas with the same structure
        {
            type: "Feature",
            properties: {
                id: "7",
                name: "Reinhardstraße",
                treesPlanted: generateRandomTrees(20, 55),
                treesMax: 25,
                color: randomColor(),
                sum: 410,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [13.381983215582949, 52.523070095275045],
                        [13.383671594214974, 52.52327316185469],
                        [13.38341637418884, 52.52361956738247],
                        [13.382768507969786, 52.52350011750889],
                        [13.38249365563422, 52.52389430085876],
                        [13.38170836324744, 52.52377485173227],
                        [13.381983215582949, 52.523070095275045],
                    ],
                ],
            },
        },
        // Add more areas with the same structure
    ],
};

// Export the GeoJSON
export default areaGeoJSON;
