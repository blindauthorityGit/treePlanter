import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// COMPS
import MainContainer from "../components/layout/mainContainer";
import Hero from "../components/Hero/hero";
import MapPage from "../components/map";
import { Popup1 } from "../components/popup";
// import MapPage from "../components/map/old2";

export default function Home() {
    return (
        <MainContainer width="max-w-[100%] container h-full grid-rows-2 m-auto" style={{ gridTemplateRows: "3fr 1fr" }}>
            <Head>
                <title>Site title</title>
            </Head>
            <MapPage></MapPage>
            <Popup1 />
        </MainContainer>
    );
}
