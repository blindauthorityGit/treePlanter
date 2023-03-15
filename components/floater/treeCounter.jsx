import { motion } from "framer-motion";
import Logo from "../../assets/SVG/logowhite.svg";
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
            className="absolute font-sans z-20 top-0 font-bold left-0 w-full py-4 bg-primaryColor-300 text-white text-center"
        >
            <div className="container mx-auto grid grid-cols-12">
                <div className="col-span-4 relative">
                    <img className="h-8 absolute" src={Logo.src} alt="" />
                </div>
                <div className="col-span-4"> Gepflanzte Bäume: {trees}</div>
                <div className="col-span-4">INFOS</div>
            </div>
        </motion.div>
    );
};

export default TreeCounter;
