import { useState, useEffect } from "react";
import React, { forwardRef } from "react";
import { BsTree } from "react-icons/bs";
import mapboxgl from "mapbox-gl";

function TreeListItem(props, ref) {
    const [address, setAddress] = useState("");

    useEffect(() => {
        async function fetchAddress() {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.e.geometry.coordinates[0]},${props.e.geometry.coordinates[1]}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`
            );
            const data = await response.json();
            setAddress(data.features[0].place_name);
        }

        fetchAddress();
    }, []);

    return (
        <>
            <div
                data-id={props.e.properties.id}
                className="wrapper hover:bg-primaryColor-50 p-2 cursor-pointer listItem w-full flex items-center mt-2 mb-4  relative "
                onMouseOver={(e) => {
                    props.onHover(e);
                }}
                onMouseLeave={(e) => {
                    props.onLeave(e);
                }}
                onClick={props.onClick}
                ref={ref}
            >
                <div className="left pr-6 h-full">
                    {props.e.anon ? (
                        <div className="text-6xl">
                            <BsPersonCircle></BsPersonCircle>
                        </div>
                    ) : (
                        <div className="text-xl h-full w-full">
                            {props.e.donator.avatar ? (
                                <div
                                    className="avatar w-12 h-12 bg-cover rounded-full"
                                    style={{ backgroundImage: `url(${props.e.donator.avatar})` }}
                                >
                                    {/* <img className="rounded-full" src={props.e.image} alt="avtrImg" /> */}
                                </div>
                            ) : (
                                <BsTree></BsTree>
                            )}
                        </div>
                    )}
                </div>
                <div className="right text-sm sm:text-sm w-auto lg:w-64">{address}</div>
                <div className="right text-sm sm:text-sm w-auto lg:w-36 pl-6">
                    <strong>€ {props.e.donator.sum} von € 500,-</strong>
                </div>

                <hr />
            </div>
        </>
    );
}

export default forwardRef(TreeListItem);
