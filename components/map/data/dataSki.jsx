47.37599, 13.033113;

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

const DataSki = [
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
            coordinates: [13.032872, 47.376048],
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
            coordinates: [13.031428, 47.375054],
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
            coordinates: [13.031328, 47.375054],
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
            coordinates: [13.032472, 47.376948],
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
            coordinates: [13.032472, 47.376648],
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
            coordinates: [13.032372, 47.376148],
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
            coordinates: [13.032872, 47.376048],
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
            coordinates: [13.032172, 47.376048],
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
            coordinates: [13.032772, 47.376048],
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
            coordinates: [13.032772, 47.376548],
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
            coordinates: [13.032472, 47.376368],
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
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032456, 47.376387],
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
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032473, 47.376385],
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
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032489, 47.376381],
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
            coordinates: [13.032505, 47.376377],
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
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032522, 47.376374],
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
            id: 16,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032539, 47.376371],
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
            id: 17,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032456, 47.376387],
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
            id: 18,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.032473, 47.376385],
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
            id: 19,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033059, 47.376248],
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
            id: 20,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033175, 47.376121],
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
            id: 21,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033248, 47.376092],
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
            id: 22,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033323, 47.376062],
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
            id: 22,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033323, 47.376062],
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
            id: 24,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033469, 47.376005],
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
            id: 25,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033542, 47.375977],
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
            id: 26,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033615, 47.375949],
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
            id: 27,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033697, 47.375938],
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
            id: 28,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.03378, 47.375927],
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
            id: 30,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033863, 47.37592],
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
            id: 31,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033956, 47.375913],
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
            id: 32,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.03345, 47.375866],
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
            id: 33,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.03385, 47.375826],
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
            id: 34,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033737, 47.375743],
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
            id: 35,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033924, 47.375626],
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
            id: 36,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033772, 47.375561],
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
            id: 37,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033618, 47.375495],
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
            id: 38,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033465, 47.375429],
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
            id: 39,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.03366, 47.375492],
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
            id: 40,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033511, 47.375486],
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
            id: 41,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033388, 47.375463],
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
            id: 42,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033281, 47.375439],
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
            id: 43,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033173, 47.375415],
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
            id: 44,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033071, 47.375391],
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
            id: 45,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033326, 47.375524],
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
            id: 46,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033335, 47.375542],
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
            id: 47,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.03335, 47.375555],
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
            id: 48,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.03336, 47.375572],
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
            id: 49,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033372, 47.37559],
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
            id: 50,
            isClaimed: false,
            icon: "tree2",
            iconSize: [50, 100],
            aspectRatio: 0.5,
        },
        geometry: {
            type: "Point",
            coordinates: [13.033379, 47.375608],
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

export default DataSki;
