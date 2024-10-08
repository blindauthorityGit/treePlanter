import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

const fetchAvatar = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const avatarUrl = data.results[0].picture.large;
    // setAvatarUrl(avatarUrl);
    console.log(avatarUrl);
    return avatarUrl;
};

const dimensions = {
    tree1: {
        desktop: [60, 125],
        mobile: [30, 62.5],
    },
};

fetchAvatar();

const data = [
    {
        type: "Feature",
        properties: {
            message: "Foo",
            id: 0,
            isClaimed: true,
            icon: "tree1",
            iconSize: [60, 125],
            aspectRatio: 0.48,
        },
        geometry: {
            type: "Point",
            coordinates: [13.388859, 52.517712],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 500,
            avatar: "https://randomuser.me/api/portraits/women/39.jpg",
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
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.395048, 52.514035],
        },
        donator: {
            name: "",
            sum: 100,
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
            aspectRatio: 1,
        },
        geometry: {
            type: "Point",
            coordinates: [13.403325, 52.523172],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 500,
            avatar: "https://randomuser.me/api/portraits/men/93.jpg",
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
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.395697, 52.522819],
        },
        donator: {
            name: "",
            sum: 280,
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
            aspectRatio: 0.58,
        },
        geometry: {
            type: "Point",
            coordinates: [13.405224, 52.514938],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 500,
            avatar: "https://randomuser.me/api/portraits/men/53.jpg",
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
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.402414, 52.522361],
        },
        donator: {
            name: "",
            sum: 10,
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
            aspectRatio: 0.73,
        },
        geometry: {
            type: "Point",
            coordinates: [13.39599, 52.520498],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 500,
            avatar: "https://randomuser.me/api/portraits/women/13.jpg",
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
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.404237, 52.519289],
        },
        donator: {
            name: "",
            sum: 480,
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
            aspectRatio: 0.48,
        },
        geometry: {
            type: "Point",
            coordinates: [13.388979, 52.517712],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 500,
            avatar: "https://randomuser.me/api/portraits/men/13.jpg",
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
            aspectRatio: 0.48,
        },
        geometry: {
            type: "Point",
            coordinates: [13.388979, 52.517812],
        },
        donator: {
            name: "Johannes Buchner",
            sum: 25,
            avatar: "",
            kommentar: "Damit unsere Stadt wieder grüner wird",
            tree: 0,
        },
    },
    {
        type: "Feature",
        properties: {
            message: "Garply",
            id: 10,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.405602, 52.520853],
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
            message: "Garply",
            id: 11,
            isClaimed: false,
            icon: "tree3",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.406621, 52.52135],
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
            message: "Garply",
            id: 12,
            isClaimed: false,
            icon: "tree1",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.40742, 52.521503],
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
            message: "Garply",
            id: 13,
            isClaimed: false,
            icon: "tree4",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.407744, 52.520626],
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
            message: "Garply",
            id: 14,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.406704, 52.52024],
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
            message: "Garply",
            id: 15,
            isClaimed: false,
            icon: "tree3",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.405683, 52.519743],
        },
        donator: {
            name: "",
            sum: 0,
            avatar: "",
            kommentar: "",
            tree: "",
        },
    },
];

data.map((e, i) => {
    console.log(e);
});

export default data;
