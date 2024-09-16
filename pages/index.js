import { useState, useEffect, useRef, useContext } from "react";

import Head from "next/head";
// COMPS
import MainContainer from "../components/layout/mainContainer";
import MapPage from "../components/map";
import { Popup1 } from "../components/popup";
import { TreeCounter, Info } from "../components/floater";
//CONTEXT
import { DataContext } from "../context/dataContext";
import areaGeoJSON from "../components/map/data/areas"; // Assuming this is the path to your areas data

export default function Home() {
    //Context Data
    const [data, setData] = useContext(DataContext);

    // Count claimed trees based on `areaGeoJSON`
    // const claimedTreesCount = Object.values(areaGeoJSON).filter((area) => area.features.properties.treesPlanted).length;
    const claimedTreesCount = 0;
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
            <TreeCounter trees={totalTreesPlanted} />

            <MapPage></MapPage>
            <Popup1 />
            <Info />
        </MainContainer>
    );
}
