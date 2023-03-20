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

function MapPage() {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(null);
    const [flyToLocation, setFlyToLocation] = useState(null);

    //Context Data
    const [data, setData] = useContext(DataContext);
    const [dataGoal, setDataGoal] = useState(data);

    //MARKERS
    const [marker, setMarker] = useState([]);

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
                    iconSize: [item.properties.iconSize[0] / 2, item.properties.iconSize[1] / 2],
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
                let personalData = "";
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
                const el = document.createElement("div");
                const width = marker.properties.iconSize[0];
                const height = marker.properties.iconSize[1];
                (el.id = marker.properties.id), (el.className = "marker");
                marker.properties.isClaimed
                    ? (() => {
                          switch (marker.donator.tree) {
                              case 0:
                                  return (el.style.backgroundImage = `url(${Tree1.src})`);
                              case 1:
                                  return (el.style.backgroundImage = `url(${Tree2.src})`);
                              case 2:
                                  return (el.style.backgroundImage = `url(${Tree3.src})`);
                              case 3:
                                  return (el.style.backgroundImage = `url(${Tree4.src})`);
                              default:
                                  return (el.style.backgroundImage = `url(${Tree1Claimed.src})`);
                          }
                      })()
                    : (el.style.backgroundImage = `url(${Tree1Unclaimed.src})`);
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                el.style.backgroundSize = "100%";
                el.classList.add("transition-all", "hover:scale-110");

                el.addEventListener("click", (e) => {
                    console.log(e.target);
                });

                // Add markers to the map.
                marker.properties.isClaimed
                    ? new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map)
                    : new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map);
                setMapLoaded(map);

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
                            console.log(index, e.currentTarget);
                            console.log(e.currentTarget.dataset.id, Data[index].geometry.coordinates);
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
                    if (zoomLevel > 10) {
                        setData([]);
                        updateIconSizes(zoomLevel);
                    }
                });
            });
        }
    }, [data, map, isMobile, isTablet, isDesktop]);

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
                zoom: 18,
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
                    setSideBarName("treeList");
                    setLeftOpen(!leftOpen);
                }}
                onClickDonator={() => {
                    toggleSidebar();
                    setSideBarName("donatorList");
                }}
            ></SidebarButtons>
            <Sidebar1 onToggle={handleToggle}>
                {sidebarName === "donatorList" && (
                    <DonatorList
                        onClick={(e) => {
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
                            sidebarName === "treeList" ? "bg-primaryColor-800" : ""
                        } cursor-pointer hover:bg-primaryColor-700 transition-all w-full sm:w-2/4 h-12 sm:h-16 rounded-xl flex justify-center items-center font-sans font-extrabold text-white text-base sm:text-xl bg-primaryColor-800`}
                        onClick={() => {
                            toggleSidebar();
                            setLeftOpen(!leftOpen);
                            setSideBarName("treeList");
                        }}
                    >
                        SPENDEN
                    </div>
                </div>
            </div>
            {isOpen && <Overlay></Overlay>}
            <div className="container ">Powered by Sabocon, 2023</div>

            {mapLoaded && <></>}
        </>
    );
}

export default MapPage;
