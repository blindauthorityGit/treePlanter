import React from "react";

const Overlay = (props) => {
    return (
        <div
            className={`${props.klasse} w-full h-screen fixed bg-black opacity-40 z-40 top-0`}
            onClick={props.onClick}
        ></div>
    );
};

export default Overlay;
