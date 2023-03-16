import { FaTimes } from "react-icons/fa";

export default function CloseButton({ onClick }) {
    return (
        <button
            className="absolute top-2 sm:top-4 z-50 right-2 sm:right-4 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClick}
        >
            <FaTimes className="w-5 h-5" />
        </button>
    );
}
