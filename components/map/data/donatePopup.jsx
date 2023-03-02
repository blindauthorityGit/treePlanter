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
        <div className="font-sans p-6">
            <h1 class="text-2xl font-bold mb-4">Baum Nr.{props.id}</h1>
            <div className="grid grid-cols-12">
                <p>{address}</p>
                <p class="text-lg col-span-12 text-xs">Mit Ihrer Spende können Sie hier einen Baum pflanzen!</p>
            </div>
            <div className="grid-cols-12 mt-4">
                <Button1 dataID={props.dataID} onClick={handleClick}>
                    Baum pflanzen
                </Button1>
            </div>
        </div>
    );
};

export default DonatePopup;
