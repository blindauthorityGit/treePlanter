import { useState, useEffect, useRef, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// COMPS
import MainContainer from "../components/layout/mainContainer";
import Hero from "../components/Hero/hero";
import MapPage from "../components/map";
import { Popup1 } from "../components/popup";
import { TreeCounter } from "../components/floater";
//CONTEXT
import { DataContext } from "../context/dataContext";

// import MapPage from "../components/map/old2";

export default function Home() {
    //Context Data
    const [data, setData] = useContext(DataContext);

    useEffect(() => {
        console.log(data.filter((e) => e.properties.isClaimed).length);
    }, []);

    return (
        <MainContainer width="max-w-[100%] container h-full grid-rows-2 m-auto" style={{ gridTemplateRows: "3fr 1fr" }}>
            <Head>
                <title>Sabocon Tree Planter</title>
            </Head>
            <TreeCounter trees={data.filter((e) => e.properties.isClaimed).length} />

            <MapPage></MapPage>
            <Popup1 />
        </MainContainer>
    );
}
