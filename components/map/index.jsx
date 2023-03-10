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

function MapPage() {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(null);
    const [flyToLocation, setFlyToLocation] = useState(null);

    //Context Data
    const [data, setData] = useContext(DataContext);

    //SIDEBAR
    const { toggleSidebar } = useContext(SidebarContext);
    const { isOpen, toggleSidebarRight } = useContext(PaymentContext);
    const [sidebarName, setSideBarName] = useState("");
    const [id, setID] = useState(0);

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    const mapContainer = useRef(null);
    // const rightRef = useRef(null);
    // const modalRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    useEffect(() => {
        // Initialize map

        const map = new Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [13.388859, 52.517712],
            pitch: 45,
            zoom: 15.5,
            bearing: -17.6,
            antialias: true,
        });

        map.addControl(
            new mapboxgl.NavigationControl({
                visualizePitch: true,
                showZoom: true,
            })
        );

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
                    />
                );
            }
            // marker.properties.isClaimed
            //     ? (personalData = `<h1 class="text-2xl">Baum Nr.${i}</h1><p class="text-lg">${marker.donator.name}</p>`)
            //     : "";

            const popup = new mapboxgl.Popup({ offset: 25, maxWidth: "300px" }).setHTML(personalData);
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
        });
    }, [data]);

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
                className="col-span-12 h-3/4 row-span-1"
                style={{ gridRow: "1 / span 3" }}
                id="map"
                ref={mapContainer}
            />
            <SidebarButtons
                onClickTree={() => {
                    toggleSidebar();
                    setSideBarName("treeList");
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
                        }}
                    ></DonatorList>
                )}
                {sidebarName === "treeList" && (
                    <TreeList
                        onClick={(e) => {
                            handleFlyToLocation(Data[e.currentTarget.dataset.id].geometry.coordinates);
                        }}
                    ></TreeList>
                )}
            </Sidebar1>
            <Sidebar2 onToggle={handleToggle}>
                <DonationContent id={id}></DonationContent>
            </Sidebar2>
            <div className="container p-16 col-span-12 row-start-2 row-end-2 mx-auto pt-6">
                <Goal></Goal>
            </div>
            {isOpen && <Overlay></Overlay>}
            <div className="container ">Powered by Sabocon, 2023</div>

            {mapLoaded && <></>}
        </>
    );
}

export default MapPage;
