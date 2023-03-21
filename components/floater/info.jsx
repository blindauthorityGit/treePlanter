import { motion } from "framer-motion";
import { useState } from "react";
// import Logo from "../../assets/SVG/logowhite.svg";
// import Logo from "../../assets/logoNeu.png";

import AI from "../ai";

const Info = (props) => {
    const [showContent, setShowContent] = useState(false);
    const [apiResult, setApiResult] = useState("");

    const handleApiSuccess = (result) => {
        setApiResult(result);
        setShowContent(true);
    };

    return (
        <>
            {showContent && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="absolute items-center hidden sm:block  font-sans w-64 h-64 z-20 top-36 font-bold right-4 rounded-full py-4 sm:py-4 bg-primaryColor-300 text-white text-center"
                >
                    <div className="containe  mx-auto h-full grid grid-cols-12 px-6 sm:px-0">
                        <div className="col-span-6 sm:col-span-12 text-sm sm:text-sm h-full items-center">
                            <div className="h-full flex items-center px-8"> {apiResult}</div>
                        </div>
                    </div>
                </motion.div>
            )}
            <AI onApiSuccess={handleApiSuccess} />
        </>
    );
};

export default Info;
