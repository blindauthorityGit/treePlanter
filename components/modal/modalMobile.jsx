import React, { forwardRef } from "react";

import { MdOutlineClose } from "react-icons/md";

const ModalMobile = ({ ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="fixed  slide-in-bottom  max-h-[100%] w-[100%] lg:w-[80%] min-h-[90%] bg-white pt-10 pb-12 px-12 lg:p-24 z-50 bottom-0"
        >
            <div
                className="closer absolute bg-white rounded-full top-[-1rem] right-6 text-3xl cursor-pointer transition hover:opacity-50 z-50"
                onClick={props.onClick}
            >
                <MdOutlineClose className="bg-white rounded-full"></MdOutlineClose>
            </div>
            {props.children}
        </div>
    );
};

export default forwardRef(ModalMobile);
