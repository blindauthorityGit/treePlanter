import { useState, useEffect, useRef, useContext } from "react";

import Head from "next/head";
// COMPS
import MainContainer from "../components/layout/mainContainer";
import MapPage from "../components/map";
import { Popup1 } from "../components/popup";
import { TreeCounter, Info } from "../components/floater";
//CONTEXT
import { DataContext } from "../context/dataContext";

export default function Home() {
    //Context Data
    const [data, setData] = useContext(DataContext);

    useEffect(() => {}, []);

    return (
        <MainContainer width="max-w-[100%] container h-full grid-rows-2 m-auto" style={{ gridTemplateRows: "3fr 1fr" }}>
            <Head>
                <title>Sabocon Tree Donator</title>
            </Head>
            <TreeCounter trees={data.filter((e) => e.properties.isClaimed).length} />

            <MapPage></MapPage>
            <Popup1 />
            <Info />
        </MainContainer>
    );
}
