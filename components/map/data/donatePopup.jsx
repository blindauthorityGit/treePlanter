import React, { useState, useEffect } from "react";
import { Button1 } from "../../buttons";
import { fetchAddressFromCoordinates } from "../../../functions/getAdress";

const DonatePopup = (props) => {
    const [address, setAddress] = useState("");

    useEffect(() => {
        console.log(props.coordinates);

        async function getAddress() {
            const address = await fetchAddressFromCoordinates(props.coordinates);
            console.log(address);
            setAddress(address);
        }

        getAddress();
    }, []);

    const handleClick = (e) => {
        props.onClick(e);
    };
    return (
        <div className="font-sans p-2 sm:p-6">
            <h1 class="text-lg sm:text-2xl font-bold mb-4">Baum Nr.{props.id}</h1>
            <div className="grid grid-cols-12">
                <p>{address}</p>
                <p class="sm:text-sm col-span-12 text-xs">Mit Ihrer Spende können Sie hier einen Baum pflanzen!</p>
                <p className="font-bold mt-6 sm:text-sm col-span-12 text-xs">
                    Noch € {500 - props.sum},- bis zum Ziel!
                </p>
                {props.sum > 0 ? (
                    <div className="col-span-12 flex mt-4">
                        {props.donators.map((e) => {
                            return (
                                <div
                                    className="avatar w-6 h-6 sm:w-6 sm:h-6 bg-cover rounded-full"
                                    style={{ backgroundImage: `url(${e.donator.avatar})` }}
                                >
                                    {/* <img className="rounded-full" src={props.e.image} alt="avtrImg" /> */}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            <div className="grid-cols-12 mt-2">
                <Button1 dataID={props.dataID} onClick={handleClick}>
                    Baum pflanzen
                </Button1>
            </div>
        </div>
    );
};

export default DonatePopup;
