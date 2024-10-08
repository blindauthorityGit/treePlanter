import { useState, useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import ReactDOMServer from "react-dom/server";
import dynamic from "next/dynamic";

import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Data from "./data";

//CONTEXT
import { SidebarProvider, SidebarContext } from "../../context/sidebarContext";
import { PaymentProvider, PaymentContext } from "../../context/paymentContext";
import { DataContext } from "../../context/dataContext";

//ASSETS
import Tree1Claimed from "../../assets/trees/treeClaimed.png";
import Tree1Unclaimed from "../../assets/trees/treeClaimed.png";
import Tree1 from "../../assets/trees/tree1.png";
import Tree2 from "../../assets/trees/tree2.png";
import Tree3 from "../../assets/trees/tree3.png";
import Tree4 from "../../assets/trees/tree4.png";

// Comps
import PersonalData from "./data/personalData";
import DonatePopup from "./data/donatePopup";
import { SidebarButtons } from "../floater";
import { Sidebar1, Sidebar2 } from "../sidebars";
import Overlay from "../../components/modal/overlay";
import Goal from "../../components/goal";
const DonatorList = dynamic(() => import("../../components/sidebarContent/donatorList"), {
    ssr: false,
});
const TreeList = dynamic(() => import("../../components/sidebarContent/treeList"), {
    ssr: false,
});
const DonationContent = dynamic(() => import("../../components/sidebarContent/donationContent"), {
    ssr: false,
});

// FUNCTIONS
import getDistance from "../../functions/getDistance";
import { useBreakpoints } from "../../functions/useBreakpoints";
import { GiVikingLonghouse } from "react-icons/gi";

function MapPage() {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(null);
    const [flyToLocation, setFlyToLocation] = useState(null);

    //Context Data
    const [data, setData] = useContext(DataContext);
    const [dataGoal, setDataGoal] = useState(data);

    //MARKERS
    const [markers, setMarkers] = useState([]);

    //REFS
    const mainBtnRef = useRef(null);

    //POPUP
    const [popupOpen, setPopupOpen] = useState(false);

    //SIDEBAR
    const { toggleSidebar } = useContext(SidebarContext);
    const [leftOpen, setLeftOpen] = useState(false);
    const { isOpen, toggleSidebarRight } = useContext(PaymentContext);
    const [sidebarName, setSideBarName] = useState("");
    const [id, setID] = useState(0);

    // MAP STUFF
    const show3D = false;
    const mapboxStyles = [
        "mapbox://styles/mapbox/light-v11",
        "mapbox://styles/mapbox/navigation-preview-day-v4",
        "mapbox://styles/mapbox/navigation-preview-night-v4",
        "mapbox://styles/mapbox/outdoors-v11",
        "mapbox://styles/mapbox/satellite-v9",
        "mapbox://styles/mapbox/satellite-streets-v11",
        "mapbox://styles/mapbox/streets-v11",
        "mapbox://styles/mapbox/streets-v10",
        "mapbox://styles/mapbox/streets-navigation-preview-night-v4",
        "mapbox://styles/mapbox/streets-navigation-preview-day-v4",
        "mapbox://styles/mapbox/traffic-day-v2",
        "mapbox://styles/mapbox/traffic-night-v2",
        "mapbox://styles/mapbox/light-v10",
        "mapbox://styles/mapbox/dark-v10",
        "mapbox://styles/mapbox/satellite-hybrid-v9",
        "mapbox://styles/mapbox/navigation-guidance-day-v4",
        "mapbox://styles/mapbox/navigation-guidance-night-v4",
    ];
    const [styleIndex, setStyleIndex] = useState(0);

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    const mapContainer = useRef(null);
    // const rightRef = useRef(null);
    // const modalRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    //POPUPS
    // Create a dictionary to store popups
    const [popups, setPopups] = useState({});

    const [map, setMap] = useState(null); // <-- declare map as state variable

    // FUNCTION UPDATE ICONS

    const updateIconSizes = (zoomLevel) => {
        const newData = data.map((item) => {
            // const aspectRatio = item.properties.iconSize[0] / item.properties.iconSize[1];
            // const newWidth = item.properties.iconSize[0] * (1 / zoomLevel) * 10;
            // const newHeight = newWidth / aspectRatio;
            // console.log(newWidth, newHeight);
            return {
                ...item,
                properties: {
                    ...item.properties,
                    iconSize: [
                        item.properties.iconSize[0] * (1 - (zoomLevel - 12) * 0.1),
                        item.properties.iconSize[1] * 1 - (zoomLevel - 12) * 0.1,
                    ],
                },
            };
        });

        setData(newData);
    };

    useEffect(() => {
        // Initialize map
        const mapObj = new Map({
            container: mapContainer.current,
            style: mapboxStyles[styleIndex],
            center: [13.405602, 52.520853],
            pitch: 45,
            zoom: 15.2,
            bearing: -17.6,
            antialias: true,
        });
        setMap(mapObj); // <-- set map to the state variable
    }, [styleIndex]);

    useEffect(() => {
        // Initialize map
        if (map) {
            data.map((marker, i) => {
                // Create a DOM element for each marker.
                if (markers.length > 0) {
                    markers.map((e) => {
                        e.remove();
                    });
                }

                if (show3D) {
                    map.on("style.load", () => {
                        // Insert the layer beneath any symbol layer.
                        const layers = map.getStyle().layers;
                        const labelLayerId = layers.find(
                            (layer) => layer.type === "symbol" && layer.layout["text-field"]
                        ).id;

                        // The 'building' layer in the Mapbox Streets
                        // vector tileset contains building height data
                        // from OpenStreetMap.
                        map.addLayer(
                            {
                                id: "add-3d-buildings",
                                source: "composite",
                                "source-layer": "building",
                                filter: ["==", "extrude", "true"],
                                type: "fill-extrusion",
                                minzoom: 15,
                                paint: {
                                    "fill-extrusion-color": "#aaa",

                                    // Use an 'interpolate' expression to
                                    // add a smooth transition effect to
                                    // the buildings as the user zooms in.
                                    "fill-extrusion-height": [
                                        "interpolate",
                                        ["linear"],
                                        ["zoom"],
                                        15,
                                        0,
                                        15.05,
                                        ["get", "height"],
                                    ],
                                    "fill-extrusion-base": [
                                        "interpolate",
                                        ["linear"],
                                        ["zoom"],
                                        15,
                                        0,
                                        15.05,
                                        ["get", "min_height"],
                                    ],
                                    "fill-extrusion-opacity": 0.6,
                                },
                            },
                            labelLayerId
                        );
                    });
                }

                let personalData = "";
                const personalDataContainer = document.createElement("div");
                const donatePopupContainer = document.createElement("div");
                if (marker.properties.isClaimed) {
                    personalData = ReactDOMServer.renderToString(
                        <PersonalData
                            id={marker.properties.id}
                            name={marker.donator.name}
                            image={marker.donator.avatar}
                            sum={marker.donator.sum}
                            kommentar={marker.donator.kommentar}
                            dataID={marker.properties.id}
                        />
                    );
                } else if (!marker.properties.isClaimed) {
                    personalData = ReactDOMServer.renderToString(
                        <DonatePopup
                            id={marker.properties.id}
                            coordinates={marker.geometry.coordinates}
                            dataID={marker.properties.id}
                            sum={marker.donator.sum}
                            donators={data.filter((e) => e.properties.isClaimed)}
                        />
                    );
                }

                // marker.properties.isClaimed
                //     ? (personalData = `<h1 class="text-2xl">Baum Nr.${i}</h1><p class="text-lg">${marker.donator.name}</p>`)
                //     : "";
                // Create a unique identifier for the popup
                const popupId = `popup-${i}`;

                const popup = new mapboxgl.Popup({ offset: 25, maxWidth: isMobile ? "220px" : "300px" }).setHTML(
                    personalData
                );
                popups[popupId] = popup;
                let donationBar;
                const el = document.createElement("div");
                const width = isMobile ? marker.properties.iconSize[0] / 1.5 : marker.properties.iconSize[0];
                const height = isMobile
                    ? marker.properties.iconSize[0] / 1.5 / marker.properties.aspectRatio
                    : marker.properties.iconSize[1];
                (el.id = marker.properties.id), (el.className = "marker");
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;

                // Create the background div
                if (!marker.properties.isClaimed) {
                    const bg = document.createElement("div");
                    bg.style.width = "100%";
                    bg.style.height = "100%";
                    bg.style.backgroundColor = "rgba(255, 255, 255, 0.5) "; // Replace with your desired background color
                    bg.style.borderRadius = "10%";
                    bg.style.border = "1px solid lightgrey";
                    el.appendChild(bg);

                    // Create the donation bar div
                    donationBar = document.createElement("div");
                    donationBar.style.position = "absolute";
                    donationBar.style.bottom = 0;
                    donationBar.style.left = 0;
                    donationBar.style.width = "100%";
                    donationBar.style.height = "0";
                    donationBar.style.backgroundColor = "#B0DBC0"; // Replace with your desired donation bar color

                    donationBar.id = "donationBar"; // Replace with your desired donation bar color
                    bg.appendChild(donationBar);
                }

                // Add the tree image
                const tree = document.createElement("div");
                tree.style.position = "absolute";
                tree.style.top = "50%";
                tree.style.left = "50%";
                tree.style.transform = "translate(-50%, -50%)";
                if (marker.properties.isClaimed) {
                    switch (marker.donator.tree) {
                        case 0:
                            tree.style.backgroundImage = `url(${Tree1.src})`;
                            break;
                        case 1:
                            tree.style.backgroundImage = `url(${Tree2.src})`;
                            break;
                        case 2:
                            tree.style.backgroundImage = `url(${Tree3.src})`;
                            break;
                        case 3:
                            tree.style.backgroundImage = `url(${Tree4.src})`;
                            break;
                        default:
                            tree.style.backgroundImage = `url(${Tree1Claimed.src})`;
                            break;
                    }
                } else {
                    tree.style.backgroundImage = `url(${Tree1Unclaimed.src})`;
                }
                tree.style.width = `${width * 0.7}px`;
                tree.style.height = `${height * 0.7}px`;
                tree.style.backgroundSize = "100%";
                tree.classList.add("transition-all", "hover:scale-110");
                el.appendChild(tree);

                // Update the donation bar height
                if (!marker.properties.isClaimed) {
                    const donationPercent = marker.donator.sum / 500;
                    donationBar.style.height = `${donationPercent * 100}%`;
                }

                // Add markers to the map.
                marker.properties.isClaimed
                    ? new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map)
                    : new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map);
                setMapLoaded(map);

                // SET UP TEMP MARKER ARRAY FOR REMOVAL OPTIONS
                setMarkers((prev) => [...prev, el]);

                popup.on("open", () => {
                    setPopupOpen(true);

                    const button = document.getElementById("myButton");
                    console.log(button);
                    if (button) {
                        button.addEventListener("click", (e) => {
                            toggleSidebarRight();
                            const index = e.currentTarget.dataset.id;
                            setID(index);
                            const coordinates = Data[index].geometry.coordinates;
                            setFlyToLocation(coordinates);
                            popup.remove();
                        });
                    }
                });
                popup.on("close", () => {
                    setPopupOpen(false);
                });
                map.on("closeAllPopups", () => {
                    popup.remove();
                });
                map.on("zoom", () => {
                    const zoomLevel = map.getZoom();
                    if (zoomLevel < 13) {
                        // updateIconSizes(zoomLevel);
                    }
                });
            });
        }
    }, [data, map]);

    function openPopup(popupId) {
        console.log(popups);
        // Find the popup with the specified ID and open it
        map.fire("closeAllPopups");

        const popup = popups[popupId];
        console.log(popups, popupId, popups["popup-0"]);
        if (popup) {
            popup.addTo(map);
            // setTimeout(() => {
            //     popup.remove();
            // }, 1000);
        }
    }
    useEffect(() => {
        if (mapLoaded && flyToLocation) {
            console.log(flyToLocation);
            mapLoaded.flyTo({
                center: flyToLocation,
                zoom: 17,
                duration: 1000,
                essential: true,
            });
        }
    }, [mapLoaded, flyToLocation]);

    const handleFlyToLocation = (location) => {
        console.log(location);
        setFlyToLocation(location);
    };

    return (
        <>
            <div
                className="col-span-12 h-calc row-span-1 mt-14"
                style={{ gridRow: "1 / span 3" }}
                id="map"
                ref={mapContainer}
            />
            <SidebarButtons
                onClickTree={() => {
                    toggleSidebar();
                    map.fire("closeAllPopups");
                    setSideBarName("treeList");
                    setLeftOpen(!leftOpen);
                }}
                onClickDonator={() => {
                    toggleSidebar();
                    map.fire("closeAllPopups");
                    setSideBarName("donatorList");
                }}
            ></SidebarButtons>
            <Sidebar1 onToggle={handleToggle}>
                {sidebarName === "donatorList" && (
                    <DonatorList
                        onClick={(e) => {
                            map.fire("closeAllPopups");
                            handleFlyToLocation(Data[e.currentTarget.dataset.id].geometry.coordinates);
                            isMobile ? toggleSidebar() : console.log("NET MOBILE");
                        }}
                    ></DonatorList>
                )}
                {sidebarName === "treeList" && (
                    <TreeList
                        onClick={(e) => {
                            handleFlyToLocation(Data[e.currentTarget.dataset.id].geometry.coordinates);
                            console.log(Data[e.currentTarget.dataset.id].properties.id);
                            isMobile ? toggleSidebar() : console.log("NET MOBILE");

                            openPopup(`popup-${Data[e.currentTarget.dataset.id].properties.id}`);
                        }}
                    ></TreeList>
                )}
            </Sidebar1>
            <Sidebar2 onToggle={handleToggle}>
                <DonationContent id={id}></DonationContent>
            </Sidebar2>
            <div className="container grid grid-cols-12 p-8 sm:p-16 col-span-12 row-start-2 row-end-2 mx-auto pt-6">
                <div className="col-span-12 sm:col-span-6 bg-white ">
                    <Goal data={dataGoal} klasse="bg-white px-12 pb-6 sm:pb-10 pt-2 sm:pt-4 shadow"></Goal>
                </div>
                <div className="col-span-12 sm:col-span-6 flex justify-end z-30 pt-8">
                    <div
                        ref={mainBtnRef}
                        className={`${
                            sidebarName === "treeList" ? "bg-text" : ""
                        } cursor-pointer hover:bg-primaryColor-700 transition-all w-full sm:w-2/4 h-12 sm:h-16 rounded-xl flex justify-center items-center font-sans font-extrabold text-white text-base sm:text-xl bg-primaryColor-800`}
                        onClick={() => {
                            toggleSidebar();
                            setLeftOpen(!leftOpen);
                            setSideBarName("treeList");
                            console.log(markers);
                            map.fire("closeAllPopups");
                        }}
                    >
                        SPENDEN
                    </div>
                </div>
            </div>
            {isOpen && <Overlay></Overlay>}
            {mapLoaded && <></>}
        </>
    );
}

export default MapPage;
