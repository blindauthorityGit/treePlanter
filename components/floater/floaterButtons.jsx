import { FaTree, FaUser, FaInfoCircle } from "react-icons/fa";

const SidebarButtons = (props) => {
    return (
        <div className="fixed left-0 top-0 flex flex-col gap-2 mt-24">
            <button
                onClick={props.onClickTree}
                className="p-4 sm:p-4 flex justify-center bg-text rounded-r-lg  text-white hover:bg-gray-700"
            >
                <FaTree size={20} />
            </button>
            <button
                onClick={props.onClickDonator}
                className="p-4 sm:p-4 flex justify-center bg-text rounded-r-lg  text-white hover:bg-gray-700"
            >
                <FaUser size={20} />
            </button>
            <button
                onClick={props.onClickInfo}
                className="p-4 sm:p-4 flex justify-center bg-text rounded-r-lg  text-white hover:bg-gray-700"
            >
                <FaInfoCircle size={20} />
            </button>
        </div>
    );
};

export default SidebarButtons;
