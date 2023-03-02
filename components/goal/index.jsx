import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import Data from "../map/data";

const Goal = (props) => {
    const { userList, setUserList } = useState(Data);
    const [data, setData] = useState(props.data);
    const [sum, setSum] = useState(0);
    const [goal, setGoal] = useState(500);
    const [percentage, setPercentage] = useState(0);
    const [showCounter, setShowCounter] = useState(false);

    const countRef = useRef();

    useEffect(() => {
        console.log(Data[0].donator.sum);
        setSum(Data.map((e) => e.donator.sum).reduce((a, b) => a + b));
    }, [data, userList]);

    useEffect(() => {
        if ((sum / goal) * 100 <= 100) {
            setPercentage((sum / goal) * 100);
        } else {
            setPercentage(100);
        }
    }, [sum]);

    setTimeout(() => {
        setShowCounter(true);
    }, 2000);

    return (
        <>
            <div className={`${props.klasse} relative`}>
                <div className="headline font-bold text-base sm:text-xl mb-2 sm:mb-4">Erreichtes Ziel</div>
                <div
                    className={` ${
                        percentage == 100 ? "font-bold" : ""
                    } then absolute text-xs sm:text-base pt-2 sm:pt-4 top-0 right-0`}
                >
                    EUR {goal},-
                </div>

                <div className="balken border h-2 sm:h-4 w-full relative">
                    <motion.div
                        className={`inner ${percentage == 100 ? "bg-[#FFD23F]" : "bg-black"}  h-full relative`}
                        id="innerProgress"
                        layout
                        initial={{
                            width: 0,
                        }}
                        animate={{ width: percentage + "%" }}
                        transition={{ duration: "300ms", delay: 1.35, type: "spring" }}
                    >
                        <div
                            ref={countRef}
                            className="now absolute text-text text-xs sm:text-base right-0 top-2 sm:top-6"
                        >
                            {showCounter && <>EUR {sum},-</>}
                            {/* EUR {sum},- */}
                        </div>
                    </motion.div>
                    <div className="wrapper relative flex">
                        {/* <div className="now pl-48 pt-4">EUR {sum},-</div> */}
                        {/* <div className="then absolute pt-4 right-0">EUR {goal},-</div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Goal;
