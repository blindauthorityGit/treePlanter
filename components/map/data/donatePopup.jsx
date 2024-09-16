import React, { useState, useEffect } from "react";
import { Button1 } from "../../buttons";
import { fetchAddressFromCoordinates } from "../../../functions/getAdress";

const DonatePopup = (props) => {
    const [address, setAddress] = useState("");
    const [hoveredDonator, setHoveredDonator] = useState(null);

    const handleDonatorHover = (donator) => {
        setHoveredDonator(donator);
        console.log(donator);
    };

    const handleDonatorLeave = () => {
        setHoveredDonator(null);
    };

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
        console.log("Button clicked, dataID: ", props.dataID);
        props.onClick(e);
    };
    return (
        <div className="font-sans p-2 sm:p-6">
            <h1 class="text-lg sm:text-2xl font-bold mb-4">{props.name}</h1>
            <div className="grid grid-cols-12">
                {/* <p>{address}</p> */}
                <p class="sm:text-sm col-span-12 text-xs">Mit Ihrer Spende können Sie hier einen Baum pflanzen!</p>
                <p
                    className="font-bold mt-6 sm:text-sm col-span-12 text-xs"
                    onMouseEnter={() => {
                        handleDonatorHover(e.donator);
                        console.log("bubu");
                    }}
                >
                    Noch € {10000 - props.sum},- bis alle Bäume gepflanzt sind!
                </p>
                {props.sum > 0 ? (
                    <div className="col-span-12 flex mt-4">
                        {props.donators.map((e) => {
                            return (
                                <div
                                    className="avatar w-6 h-6 sm:w-6 sm:h-6 bg-cover rounded-full relative"
                                    style={{ backgroundImage: `url(${e.donator.avatar})` }}
                                    onMouseEnter={() => {
                                        handleDonatorHover(e.donator);
                                        console.log("bubu");
                                    }}
                                    onMouseLeave={handleDonatorLeave}
                                >
                                    {hoveredDonator && (
                                        <div className="tooltip">
                                            {hoveredDonator.name}
                                            <br />
                                            Donation Amount: {hoveredDonator.amount}
                                        </div>
                                    )}

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
