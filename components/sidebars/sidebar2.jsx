import React, { useState, useContext } from "react";
import { Closer } from "../buttons";
import { PaymentContext } from "../../context/paymentContext";

const Sidebar2 = (props) => {
    const { isOpen, toggleSidebarRight } = useContext(PaymentContext);

    return (
        <div
            className={` top-0 right-0  md:w-3/4 lg:w-1/3 z-50 h-full bg-gray-100 transition-transform duration-300 transform ${
                isOpen ? "translate-x-0 fixed sm:fixed" : "fixed translate-x-full"
            }`}
        >
            <Closer onClick={toggleSidebarRight}></Closer>
            {props.children}
        </div>
    );
};

export default Sidebar2;
