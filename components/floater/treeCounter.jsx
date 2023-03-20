import { motion } from "framer-motion";
// import Logo from "../../assets/SVG/logowhite.svg";
import Logo from "../../assets/logoNeu1.svg";
// import Logo from "../../assets/logoNeu.png";
import { BsFacebook, BsInstagram, BsTwitter, BsInfoCircleFill } from "react-icons/bs";
const TreeCounter = ({ trees }) => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className="absolute font-sans z-20 top-0 font-bold left-0 w-full py-4 sm:py-4 bg-primaryColor-300 text-white text-center"
        >
            <div className="container mx-auto grid grid-cols-12 px-6 sm:px-0">
                <div className="col-span-6 sm:col-span-4 relative">
                    <img className="h-6 sm:h-8 absolute" src={Logo.src} alt="" />
                </div>
                <div className="col-span-6 sm:col-span-4 text-sm sm:text-lg"> Gepflanzte Bäume: {trees}</div>
                <div className="hidden sm:flex sm:col-span-4  justify-end text-right w-full">
                    <BsFacebook className="mr-4" />
                    <BsInstagram className="mr-4" />
                    <BsTwitter className="mr-4" />
                    <BsInfoCircleFill />
                </div>
            </div>
        </motion.div>
    );
};

export default TreeCounter;
