import React from "react";

const Button1 = (props) => {
    return (
        <button
            id="myButton"
            onClick={props.onClick}
            data-id={props.dataID}
            className="bg-primaryColor myButton z-30 mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-white lg:mt-8 py-2 text-xs sm:text-base sm:py-3 px-6 sm:min-w-[10rem] w-full uppercase rounded-md md:mt-8"
        >
            <span className="">{props.children}</span>
        </button>
    );
};

export default Button1;
