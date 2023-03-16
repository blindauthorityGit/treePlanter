import React, { forwardRef } from "react";
import { BsPersonCircle } from "react-icons/bs";

function ListItem(props, ref) {
    return (
        <>
            <div
                data-id={props.e.properties.id}
                className="wrapper hover:bg-primaryColor-50 p-2 cursor-pointer listItem w-full flex items-center mt-2 mb-2 sm:mb-4  relative "
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
                        <div className="text-6xl h-full w-full">
                            {props.e.donator.avatar ? (
                                <div
                                    className="avatar w-10 h-10 sm:w-16 sm:h-16 bg-cover rounded-full"
                                    style={{ backgroundImage: `url(${props.e.donator.avatar})` }}
                                >
                                    {/* <img className="rounded-full" src={props.e.image} alt="avtrImg" /> */}
                                </div>
                            ) : (
                                <BsPersonCircle></BsPersonCircle>
                            )}
                        </div>
                    )}
                </div>
                <div className="right text-xs sm:text-base w-auto lg:w-64">
                    <strong>{!props.e.anon ? props.e.donator.name : "Anonymer Spender"}</strong>
                    <br />
                    Spende: EUR {props.e.donator.sum},-
                    {props.e.donator.kommentar && (
                        <div className="farRight lg:hidden mt-2 text-xs border p-1 sm:p-2 lg:p-4 bg-[#dcdfdc]">
                            {props.e.donator.kommentar}
                        </div>
                    )}
                </div>
                {props.e.donator.kommentar && (
                    <div className="farRight comment hidden lg:block text-xs border p-2 lg:p-4 bg-primaryColor-300">
                        {props.e.donator.kommentar}
                    </div>
                )}{" "}
                <hr />
            </div>
        </>
    );
}

export default forwardRef(ListItem);
