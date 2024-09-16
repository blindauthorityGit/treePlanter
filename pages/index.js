import { useState, useEffect, useContext } from "react";
import Head from "next/head";
// COMPS
import MainContainer from "../components/layout/mainContainer";
import MapPage from "../components/map";
import MapPageOld from "../components/map/mapOld";
import { Popup1 } from "../components/popup";
import { TreeCounter, Info } from "../components/floater";
// CONTEXT
import { DataContext } from "../context/dataContext";
import areaGeoJSON from "../components/map/data/areas"; // Assuming this is the path to your areas data

export default function Home() {
    // Context Data
    const [data, setData] = useContext(DataContext);
    const [showOldMap, setShowOldMap] = useState(false); // State to toggle between MapPage and MapPageOld

    // Calculate total treesPlanted from `areaGeoJSON`
    const totalTreesPlanted = Object.values(areaGeoJSON)[1].reduce((total, area) => {
        return total + (area.properties.treesPlanted || 0);
    }, 0);

    useEffect(() => {
        console.log(Object.values(areaGeoJSON));
        console.log(totalTreesPlanted);
    }, []);

    return (
        <MainContainer width="max-w-[100%] container h-full grid-rows-2 m-auto" style={{ gridTemplateRows: "3fr 1fr" }}>
            <Head>
                <title>Sabocon Tree Donator</title>
            </Head>

            {/* Tree Counter */}
            <TreeCounter trees={totalTreesPlanted} />

            {/* Toggle Button to Switch Between Maps */}
            <div className="flex justify-center my-2 z-50 absolute top-[6%] lg:top-[50%] lg:left-4 text-sm">
                <button
                    className="bg-primaryColor-600 text-white py-2 px-6 rounded-lg hover:bg-primaryColor-800 transition"
                    onClick={() => setShowOldMap(!showOldMap)} // Toggle between maps
                >
                    {showOldMap ? "Switch to Area Map" : "Switch to Personal Map"}
                </button>
            </div>

            {/* Conditionally Render MapPage or MapPageOld */}
            {showOldMap ? (
                <MapPageOld totalTreesPlanted={totalTreesPlanted} /> // Pass totalTreesPlanted to MapPageOld
            ) : (
                <MapPage totalTreesPlanted={totalTreesPlanted} /> // Pass totalTreesPlanted to MapPage
            )}

            <Popup1 />
            <Info />
        </MainContainer>
    );
}
