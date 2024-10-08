import { FaTimes } from "react-icons/fa";

export default function CloseButton({ onClick }) {
    return (
        <button
            className="absolute top-1 sm:top-2 z-50 right-1 sm:right-2 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClick}
        >
            <FaTimes className="w-5 h-5" />
        </button>
    );
}
