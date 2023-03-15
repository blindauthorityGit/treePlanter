import React from "react";

const PersonalData = (props) => {
    return (
        <div className="font-sans">
            <h1 class="text-2xl font-bold mb-4">Baum Nr.{props.id}</h1>
            <div className="grid grid-cols-12">
                <div
                    className="col-span-3 rounded-full cursor-pointer"
                    onClick={() => {
                        console.log("clicked");
                    }}
                >
                    <div
                        className="h-12 w-12 bg-cover rounded-full"
                        style={{ backgroundImage: `url(${props.image})` }}
                    ></div>
                </div>
                <div className="col-span-9">
                    <p class="text-xs sm:text-sm font-semibold">{props.name}</p>
                    <p class="text-xs sm:text-sm">Spende: € {props.sum},-</p>
                </div>
            </div>
            <div className="grid-cols-12 mt-4 italic bg-primaryColor-100 p-4">
                <p className="text-xs sm:text-sm">{props.kommentar}</p>
            </div>
        </div>
    );
};

export default PersonalData;
