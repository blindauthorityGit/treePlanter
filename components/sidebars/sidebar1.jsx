import React, { useState, useContext } from "react";
import { Closer } from "../buttons";
import { SidebarContext } from "../../context/sidebarContext";

const Sidebar1 = (props) => {
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

    return (
        <div
            className={`fixed top-0 left-0 p-6 md:w-3/4 lg:w-1/3 z-30 h-full bg-white transition-transform duration-300 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <Closer onClick={toggleSidebar}></Closer>
            {props.children}
        </div>
    );
};

export default Sidebar1;
