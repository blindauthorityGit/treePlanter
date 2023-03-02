const data = [
    {
        type: "Feature",
        properties: {
            message: "Foo",
            id: 0,
            isClaimed: true,
            icon: "tree1",
            iconSize: [60, 125],
        },
        geometry: {
            type: "Point",
            coordinates: [13.388859, 52.517712],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 0,
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Bar",
            id: 1,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
        },
        geometry: {
            type: "Point",
            coordinates: [13.395048, 52.514035],
        },
        donator: {
            name: "",
            sum: 0,
            avatar: "",
            kommentar: "",
            tree: "",
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Baz",
            id: 2,
            isClaimed: true,
            icon: "tree3",
            iconSize: [70, 70],
        },
        geometry: {
            type: "Point",
            coordinates: [13.403325, 52.523172],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 1,
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Qux",
            id: 3,
            isClaimed: false,
            icon: "tree4",
            iconSize: [50, 100],
        },
        geometry: {
            type: "Point",
            coordinates: [13.395697, 52.522819],
        },
        donator: {
            name: "",
            sum: 0,
            avatar: "",
            kommentar: "",
            tree: "",
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Quux",
            id: 4,
            isClaimed: true,
            icon: "tree5",
            iconSize: [70, 120],
        },
        geometry: {
            type: "Point",
            coordinates: [13.405224, 52.514938],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 2,
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Corge",
            id: 5,
            isClaimed: false,
            icon: "tree6",
            iconSize: [50, 100],
        },
        geometry: {
            type: "Point",
            coordinates: [13.402414, 52.522361],
        },
        donator: {
            name: "",
            sum: 0,
            avatar: "",
            tree: "",
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Grault",
            id: 6,
            isClaimed: true,
            icon: "tree7",
            iconSize: [80, 110],
        },
        geometry: {
            type: "Point",
            coordinates: [13.39599, 52.520498],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 3,
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Garply",
            id: 7,
            isClaimed: false,
            icon: "tree8",
            iconSize: [50, 100],
        },
        geometry: {
            type: "Point",
            coordinates: [13.404237, 52.519289],
        },
        donator: {
            name: "",
            sum: 0,
            avatar: "",
            kommentar: "",
            tree: "",
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Foo",
            id: 8,
            isClaimed: true,
            icon: "tree1",
            iconSize: [60, 125],
        },
        geometry: {
            type: "Point",
            coordinates: [13.388979, 52.517712],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 0,
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Foo",
            id: 9,
            isClaimed: false,
            icon: "tree1",
            iconSize: [60, 125],
        },
        geometry: {
            type: "Point",
            coordinates: [13.388979, 52.517812],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 0,
        },
    },
];

data.map((e, i) => {
    console.log(e);
});

export default data;
