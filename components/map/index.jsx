import { useState, useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import ReactDOMServer from "react-dom/server";
import dynamic from "next/dynamic";

import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Data from "./data";
import areaGeoJSON from "./data/areas";

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

import * as turf from "@turf/turf"; // Install turf.js for geospatial calculations

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

    // Function to generate random points within a polygon
    const generateRandomPointsInPolygon = (polygon, numPoints) => {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            const randomPoint = turf.randomPoint(1, { bbox: turf.bbox(polygon) });
            const isInside = turf.booleanPointInPolygon(randomPoint.features[0], polygon);
            if (isInside) {
                points.push(randomPoint.features[0].geometry.coordinates);
            } else {
                i--; // Retry if the point is not inside the polygon
            }
        }
        return points;
    };

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
        const mapObj = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapboxStyles[styleIndex],
            center: [13.405602, 52.520853],
            pitch: 45,
            zoom: 15.2,
            bearing: -17.6,
            antialias: true,
        });

        // Function to calculate tree icon size based on zoom level
        const getIconSizeByZoom = (zoomLevel) => {
            const minSize = 12; // Minimum size for small zoom
            const maxSize = 40; // Maximum size for large zoom
            const scale = (zoomLevel - 12) / 4; // Scaling factor based on zoom

            // Calculate size, keeping it within min and max bounds
            const iconSize = Math.min(maxSize, Math.max(minSize, minSize + scale * (maxSize - minSize)));
            return iconSize;
        };

        mapObj.on("load", () => {
            if (!mapObj.getSource("areas")) {
                mapObj.addSource("areas", {
                    type: "geojson",
                    data: areaGeoJSON,
                });
            }

            if (!mapObj.getLayer("areas-fill")) {
                mapObj.addLayer({
                    id: "areas-fill",
                    type: "fill",
                    source: "areas",
                    paint: {
                        "fill-color": ["get", "color"], // Use custom colors from the GeoJSON
                        "fill-opacity": 0.5,
                    },
                });
            }

            if (!mapObj.getLayer("areas-outline")) {
                mapObj.addLayer({
                    id: "areas-outline",
                    type: "line",
                    source: "areas",
                    paint: {
                        "line-color": "#000",
                        "line-width": 2,
                    },
                });
            }

            // Add area click event listener for popup and highlight
            mapObj.on("click", "areas-fill", (e) => {
                const clickedArea = e.features[0];

                // Highlight the clicked area by setting a thicker stroke
                mapObj.setPaintProperty("areas-outline", "line-width", [
                    "case",
                    ["==", ["get", "id"], clickedArea.properties.id], // Highlight only the clicked area
                    5, // Thick stroke for selected area
                    2, // Default stroke width for other areas
                ]);

                // Render custom popup content just like you do for markers
                let personalData = "";
                if (clickedArea.properties.treesPlanted == clickedArea.properties.treesMax) {
                    personalData = ReactDOMServer.renderToString(
                        <PersonalData
                            id={clickedArea.properties.id}
                            name={clickedArea.properties.name || "Area"}
                            treesPlanted={clickedArea.properties.treesPlanted}
                            sum={clickedArea.properties.sum}
                        />
                    );
                } else {
                    personalData = ReactDOMServer.renderToString(
                        <DonatePopup
                            id={clickedArea.properties.id}
                            coordinates={clickedArea.geometry.coordinates}
                            treesPlanted={clickedArea.properties.treesPlanted || 0}
                            sum={clickedArea.properties.sum}
                            name={clickedArea.properties.name || "Area"}
                            donators={data.filter((e) => e.properties.isClaimed)}
                            dataID={clickedArea.properties.id} // Ensure that the button has a unique identifier like dataID
                        />
                    );
                }

                // Create a unique identifier for the popup
                const popupId = `popup-${clickedArea.properties.id}`;

                // Create a popup with your custom HTML
                const popup = new mapboxgl.Popup({ offset: 25, maxWidth: isMobile ? "220px" : "300px" }).setHTML(
                    personalData
                );

                popups[popupId] = popup;

                popup.on("open", () => {
                    setPopupOpen(true);

                    const button = document.getElementById("myButton");
                    console.log(button);

                    if (button) {
                        button.addEventListener("click", (e) => {
                            toggleSidebarRight();
                            const index = e.currentTarget.dataset.id;
                            console.log(index);

                            // Find the matching area based on the `id` property
                            const area = areaGeoJSON.features.find((feature) => feature.properties.id === index);

                            if (area) {
                                // Assuming it's a Polygon and you want the first coordinate
                                const coordinates = area.geometry.coordinates[0][0];
                                console.log("Found coordinates: ", coordinates);

                                setFlyToLocation(coordinates); // Fly to the coordinates
                                popup.remove(); // Close the popup
                            } else {
                                console.error("Area not found for ID: ", index);
                            }
                        });
                    }
                });

                // Set the popup at the clicked point
                popup.setLngLat(e.lngLat).addTo(mapObj);
            });

            // Change the cursor to pointer when hovering over areas
            mapObj.on("mouseenter", "areas-fill", () => {
                mapObj.getCanvas().style.cursor = "pointer";
            });

            mapObj.on("mouseleave", "areas-fill", () => {
                mapObj.getCanvas().style.cursor = "";
            });

            // Arrays to store tree markers and large markers
            let markers = [];
            let largeMarkers = [];

            // Function to add individual tree markers
            const addTreeMarkers = (area, zoomLevel) => {
                const numTrees = area.properties.treesPlanted || 10;
                const polygon = turf.polygon(area.geometry.coordinates);
                const treeCoordinates = generateRandomPointsInPolygon(polygon, numTrees);

                const iconSize = getIconSizeByZoom(zoomLevel); // Get icon size based on zoom level

                treeCoordinates.forEach((coords) => {
                    const treeElement = document.createElement("div");
                    treeElement.className = "tree-marker";
                    treeElement.style.backgroundImage = `url(${Tree3.src})`; // Your tree icon
                    treeElement.style.width = `${"20"}px`; // Set icon width
                    treeElement.style.height = `${"20" * 1.5}px`; // Keep aspect ratio for height
                    treeElement.style.backgroundSize = "cover";

                    const marker = new mapboxgl.Marker(treeElement).setLngLat(coords).addTo(mapObj);
                    markers.push(marker); // Store the marker
                });
            };

            // Function to add a large tree marker (dynamic size green circle with number of trees)
            const addLargeTreeMarker = (area) => {
                const numTrees = area.properties.treesPlanted || 1; // Number of trees
                const minSize = 30; // Minimum circle size (pixels)
                const maxSize = 100; // Maximum circle size (pixels)

                // Scale the size of the circle based on the number of trees, capped between min and max
                const circleSize = Math.min(maxSize, minSize + Math.log(numTrees) * 15); // Logarithmic scale for reasonable growth

                const largeTreeElement = document.createElement("div");
                largeTreeElement.className = "large-tree-marker";
                largeTreeElement.style.width = `${circleSize}px`;
                largeTreeElement.style.height = `${circleSize}px`;
                largeTreeElement.style.borderRadius = "50%";
                largeTreeElement.style.backgroundColor = "green"; // Green background for the circle
                largeTreeElement.style.display = "flex";
                largeTreeElement.style.justifyContent = "center";
                largeTreeElement.style.alignItems = "center";
                largeTreeElement.style.color = "white"; // White text color
                largeTreeElement.style.fontSize = "14px";
                largeTreeElement.style.border = "white 5px solid";
                largeTreeElement.style.fontWeight = "bold";
                largeTreeElement.innerHTML = `${numTrees}`; // Display number of trees

                // Get the center of the polygon
                const center = turf.center(turf.polygon(area.geometry.coordinates)).geometry.coordinates;

                // Create the marker and add it to the map
                const marker = new mapboxgl.Marker(largeTreeElement).setLngLat(center).addTo(mapObj);

                // Add click event listener to the marker
                marker.getElement().addEventListener("click", () => {
                    // Trigger popup for the corresponding area when the marker is clicked
                    const clickedArea = area;

                    // Create custom popup content just like for the area fill layer
                    let personalData = "";
                    if (clickedArea.properties.treesPlanted === clickedArea.properties.treesMax) {
                        personalData = ReactDOMServer.renderToString(
                            <PersonalData
                                id={clickedArea.properties.id}
                                name={clickedArea.properties.name || "Area"}
                                treesPlanted={clickedArea.properties.treesPlanted}
                                sum={clickedArea.properties.sum}
                            />
                        );
                    } else {
                        personalData = ReactDOMServer.renderToString(
                            <DonatePopup
                                id={clickedArea.properties.id}
                                coordinates={clickedArea.geometry.coordinates}
                                treesPlanted={clickedArea.properties.treesPlanted || 0}
                                sum={clickedArea.properties.sum}
                                name={clickedArea.properties.name || "Area"}
                                donators={data.filter((e) => e.properties.isClaimed)}
                                dataID={clickedArea.properties.id} // Ensure that the button has a unique identifier like dataID
                            />
                        );
                    }

                    // Create a unique identifier for the popup
                    const popupId = `popup-${clickedArea.properties.id}`;

                    // Create a popup with your custom HTML
                    const popup = new mapboxgl.Popup({
                        offset: 25,
                        maxWidth: isMobile ? "220px" : "300px",
                    }).setHTML(personalData);

                    popups[popupId] = popup;

                    popup.on("open", () => {
                        setPopupOpen(true);

                        const button = document.getElementById("myButton");
                        console.log(button);

                        if (button) {
                            button.addEventListener("click", (e) => {
                                toggleSidebarRight();
                                const index = e.currentTarget.dataset.id;
                                console.log(index);

                                // Find the matching area based on the `id` property
                                const area = areaGeoJSON.features.find((feature) => feature.properties.id === index);

                                if (area) {
                                    // Assuming it's a Polygon and you want the first coordinate
                                    const coordinates = area.geometry.coordinates[0][0];
                                    console.log("Found coordinates: ", coordinates);

                                    setFlyToLocation(coordinates); // Fly to the coordinates
                                    popup.remove(); // Close the popup
                                } else {
                                    console.error("Area not found for ID: ", index);
                                }
                            });
                        }
                    });

                    popup.setLngLat(center).addTo(mapObj); // Add popup to the marker's location
                });

                largeMarkers.push(marker); // Store the large marker
            };

            // Function to remove markers
            const removeMarkers = (markerArray) => {
                markerArray.forEach((marker) => marker.remove());
            };

            // Initial setup - add individual tree markers
            areaGeoJSON.features.forEach((area) => {
                addTreeMarkers(area, mapObj.getZoom());
            });

            // Zoom event to handle marker display based on zoom level
            mapObj.on("zoom", () => {
                const zoomLevel = mapObj.getZoom();

                // Switch between individual tree markers and a single large marker
                if (zoomLevel < 14) {
                    // Remove individual tree markers, add large marker if not already added
                    removeMarkers(markers);
                    markers = []; // Clear the markers array after removal

                    if (largeMarkers.length === 0) {
                        areaGeoJSON.features.forEach((area) => {
                            addLargeTreeMarker(area);
                        });
                    }
                } else {
                    // Remove large markers, add individual tree markers if not already added
                    removeMarkers(largeMarkers);
                    largeMarkers = []; // Clear the largeMarkers array after removal

                    if (markers.length === 0) {
                        areaGeoJSON.features.forEach((area) => {
                            addTreeMarkers(area, zoomLevel); // Pass the current zoom level to adjust icon size
                        });
                    }
                }
            });

            setMapLoaded(true);
        });

        setMap(mapObj);

        // Cleanup function
        return () => {
            mapObj.remove();
        };
    }, [styleIndex]);

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
        if (map && flyToLocation) {
            // Check if map is loaded and flyToLocation is set
            console.log(flyToLocation);
            map.flyTo({
                center: flyToLocation,
                zoom: 17,
                duration: 1000,
                essential: true,
            });
        }
    }, [map, flyToLocation]); // Add map and flyToLocation as dependencies

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
                            const areaArray = Object.values(areaGeoJSON.features); // Convert areaGeoJSON features to an array

                            const selectedArea = areaArray[e.currentTarget.dataset.id - 1]; // Get the selected area from the array
                            handleFlyToLocation(selectedArea.geometry.coordinates[0][0]); // Use coordinates of the selected area
                            console.log(selectedArea.properties.id); // Log the id of the selected area

                            if (isMobile) {
                                toggleSidebar();
                            } else {
                                console.log("NET MOBILE");
                            }

                            openPopup(`popup-${selectedArea.properties.id}`); // Open the popup for the selected area
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
                        } cursor-pointer hover:bg-primaryColor-700 transition-all w-full sm:w-2/4 h-12 sm:h-16 rounded-xl flex justify-center items-center font-sans font-semibold text-white text-base sm:text-base bg-primaryColor-800`}
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
