import { FaTree, FaUser, FaInfoCircle } from "react-icons/fa";

const SidebarButtons = (props) => {
    return (
        <div className="fixed left-0 top-0 flex flex-col gap-4 mt-24">
            <button onClick={props.onClickTree} className="p-4 bg-gray-800 rounded-r-lg  text-white hover:bg-gray-700">
                <FaTree size={24} />
            </button>
            <button
                onClick={props.onClickDonator}
                className="p-4 bg-gray-800 rounded-r-lg  text-white hover:bg-gray-700"
            >
                <FaUser size={24} />
            </button>
            <button onClick={props.onClickInfo} className="p-4 bg-gray-800 rounded-r-lg  text-white hover:bg-gray-700">
                <FaInfoCircle size={24} />
            </button>
        </div>
    );
};

export default SidebarButtons;
