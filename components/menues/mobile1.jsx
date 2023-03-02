import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Logo from "../../assets/logoFin.svg";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";

const Mobile1 = (props) => {
    const [showMenu, setShowMenu] = useState(props.showMenu);
    const { asPath } = useRouter();

    const burgerRef = useRef();

    function clicker(e) {
        console.log("Clicked");
    }

    // useEffect(() => {
    //     props.showMenu(false);
    // }, [asPath]);

    const boxMotion = {
        rest: {
            opacity: 0,
            display: "none",
            ease: "easeOut",
            duration: 0.2,
            type: "spring",
            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeIn",
            },
        },

        end: {
            opacity: 1,
            display: "block",
            transition: {
                duration: 0.4,
                type: "spring",
                ease: "easeIn",
            },
        },
    };

    const textMotion = {
        rest: {
            x: -50,
            opacity: 0,

            transition: {
                duration: 2.85,
                type: "tween",
                ease: "easeIn",
            },
        },
        end: {
            opacity: 1,
            x: 0,
            display: "block",
            transition: {
                duration: 0.4,
                type: "spring",
                ease: "easeIn",
            },
        },
        hover: {
            // color: "blue",
            x: 0,
            opacity: 1,

            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            <motion.nav
                variants={boxMotion}
                className={`navbar slide-in-right ${props.klasse} 
                w-[90%] right-0 h-screen bg-primaryColor-100 fixed z-50 top-0 `}
            >
                <div onClick={props.onClick} className="closer absolute  rounded-full p-1 right-6 top-3">
                    <GrClose className=""></GrClose>
                </div>
                <div className="container h-screen py-3 px-12 font-europa tracking-wider">
                    <div className="middle flex justify-start">
                        <Link href="/">
                            <a>
                                <img src={Logo.src} width="32" alt="Logo" />
                            </a>
                        </Link>
                    </div>
                    <div className="MenuItems text-sm sm:text-4xl pt-4 font-oswald ">
                        <motion.ul variants={boxMotion} className="">
                            <motion.li variants={textMotion} className="mb-4">
                                <div className="wrap dropdown text-primaryColor-900  ">
                                    <a className="text-text block my-3 subNav relative hover:text-primaryColor cursor-pointer">
                                        Kurse{" "}
                                    </a>
                                    <hr />
                                    <ul className="pl-8 mt-4 mb-4 text-primaryColor-900">
                                        <Link href="/about">
                                            <li className="mb-3">Winterakademie</li>
                                        </Link>
                                        <Link href="/sammlungen">
                                            <li className="mb-3">Frühlingsakademie</li>
                                        </Link>
                                        <Link
                                            href="https://atelierbuchner.at/piz1000/Museumsleitbild.pdf"
                                            target="_blank"
                                        >
                                            <li className="mb-3">Sommerakademie</li>
                                        </Link>
                                        <Link href="/kontakt">
                                            <li className="mb-3">Herbstakadmie</li>
                                        </Link>
                                    </ul>
                                    <hr />
                                    <Link href="./besuch">
                                        <a className="text-text block my-3 subNav relative mt-4 hover:text-primaryColor cursor-pointer">
                                            Galerie
                                        </a>
                                    </Link>
                                </div>
                            </motion.li>
                            <li className="mr-8 hover:text-primaryColor hover:underline mb-4 text-primaryColor-900">
                                <Link href="/events">
                                    <a>News</a>
                                </Link>
                            </li>
                            <li className="text-primaryColor-900">
                                <Link href="/kontakt ">
                                    <a>Kontakt</a>
                                </Link>
                            </li>
                        </motion.ul>
                        <hr className="mt-4" />
                        <ul className="tracking-widest text-primaryColor-900">
                            <li className="mb-3 mt-8 text-xs">
                                <div className="wrap dropdown   ">
                                    <Link href="/impressum">
                                        <a className="text-text block my-4 subNav relative hover:text-primaryColor cursor-pointer">
                                            Impressum
                                        </a>
                                    </Link>

                                    <Link href="/datenschutz">
                                        <a className="text-text block my-4 subNav relative mt-4 hover:text-primaryColor cursor-pointer">
                                            Datenschutzerklärung
                                        </a>
                                    </Link>
                                </div>
                            </li>
                            <li className="">
                                <div className="sm:hidden flex ">
                                    {props.socialMedia.map((e, i) => {
                                        return (
                                            <a className="mr-4 pt-2" key={`smKey${i}`} href={e.link} alt={e.title}>
                                                {e.icon}
                                            </a>
                                        );
                                    })}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* <div className="Kontakt flex mt-10">
                        <div className="left w-1/2">
                            <H4>Kontakt</H4>
                            <div className="content text-xs leading-relaxed">
                                <div> {props.strasse}</div>
                                <div> {props.ort}</div>
                                <div className="mt-4">{props.phone}</div>
                                <div>
                                    {" "}
                                    <a href="mailto:contacts@german-aesthetics.de"> {props.email}</a>
                                </div>
                            </div>
                        </div>
                        <div className="right w-1/2">
                            <H4>Praxiszeiten</H4>

                            <div className="wrapper flex  text-xs leading-relaxed">
                                <div className="left mr-6 text-left ">
                                    Mo
                                    <br />
                                    Di
                                    <br />
                                    Mi
                                    <br />
                                    Do
                                    <br />
                                    Fr
                                    <br />
                                </div>
                                <div className="right text-left">
                                    <PortableText value={props.value} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </motion.nav>
        </>
    );
};

export default Mobile1;
