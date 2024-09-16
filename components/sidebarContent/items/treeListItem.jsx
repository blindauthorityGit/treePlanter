import { useState, useEffect } from "react";
import React, { forwardRef } from "react";
import { BsTree } from "react-icons/bs";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";

function TreeListItem(props, ref) {
    const [address, setAddress] = useState("");

    useEffect(() => {
        // async function fetchAddress() {
        //     const response = await fetch(
        //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.e.geometry.coordinates[0]},${props.e.geometry.coordinates[1]}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`
        //     );
        //     const data = await response.json();
        //     setAddress(data.features[0].place_name);
        // }

        // fetchAddress();
        console.log(props);
    }, []);

    return (
        <>
            <div
                data-id={props.e.properties.id}
                className="wrapper relative hover:bg-primaryColor-50 p-2 cursor-pointer listItem w-full flex items-center mt-2 mb-4  relative "
                onMouseOver={(e) => {
                    props.onHover(e);
                }}
                onMouseLeave={(e) => {
                    props.onLeave(e);
                }}
                onClick={props.onClick}
                ref={ref}
            >
                <div className="grid grid-cols-12 w-full">
                    <div className="left col-span-2 pr-6 h-full">
                        {props.e.anon ? (
                            <div className="text-6xl">
                                <BsPersonCircle></BsPersonCircle>
                            </div>
                        ) : (
                            <div className="text-xl h-full w-full">
                                {props.e?.donator?.avatar ? (
                                    <div
                                        className="avatar w-12 h-12 bg-cover rounded-full"
                                        style={{ backgroundImage: `url(${props.e.donator.avatar})` }}
                                    >
                                        {/* <img className="rounded-full" src={props.e.image} alt="avtrImg" /> */}
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm font-semibold">
                                        {" "}
                                        {props.e.properties.treesPlanted} <BsTree></BsTree>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="right col-span-7 text-xs sm:text-sm w-auto lg:w-64">{props.e.properties.name}</div>
                    <div className="right col-span-3 text-xs sm:text-sm w-auto pl-6 text-right">
                        <strong>€{props.e.properties.sum} / 10.000,-</strong>
                    </div>
                </div>
                <hr />
                <div className="absolute h-1 w-full bg-white border top-0 border-primaryColor-600">
                    {/* <div
                        className="sum bg-primaryColor-500 h-full"
                        style={{ width: (props.e.donator.sum / 500) * 100 + "%" }}
                    ></div> */}
                    <motion.div
                        className={`inner bg-primaryColor-500  h-full relative`}
                        id="innerProgress"
                        layout
                        initial={{
                            width: 0,
                        }}
                        animate={{ width: (props.e.properties.sum / 10000) * 100 + "%" }}
                        transition={{ duration: "300ms", delay: 1.35, type: "spring" }}
                    ></motion.div>
                </div>
            </div>
        </>
    );
}

export default forwardRef(TreeListItem);
