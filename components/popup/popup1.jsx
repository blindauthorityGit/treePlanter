import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

//ASSETS
import BG from "../../assets/popup/bg.jpg";

const Popup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center font-sans justify-center z-50">
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70"></div>
                    <div
                        style={{ backgroundImage: `url(${BG.src})` }}
                        className="p-10 sm:p-16 w-[98%] sm:w-[960px] h-auto sm:h-[640px] grid grid-cols-12 rounded-lg shadow-lg z-10"
                    >
                        <button className="absolute top-2 right-2" onClick={handleClosePopup}>
                            <FaTimes className="h-5 w-5 text-gray-600" />
                        </button>
                        <h2 className="text-xl  sm:text-4xl col-span-12 sm:col-span-6 font-bold font-semibold mb-8 sm:mb-2 uppercase">
                            Machen Sie unsere Stadt <span className="text-primaryColor-600">grüner</span>
                        </h2>
                        <div className="sm:col-span-0"></div>
                        <div className="sm:mb-4 mb-10 col-span-12 sm:col-span-6 font-semibold">
                            <p>Helfen Sie mit, unsere Stadt lebenswerter & schöner zu machen!</p>
                            <p>Mit Ihrer Spende wird ein Baum an einem Platz Ihrer Wahl gepflanzt.</p>
                        </div>

                        <div className="col-span-0"></div>

                        <button
                            className="bg-primaryColor-600 sm:h-2/4 col-span-12 sm:col-span-6 text-white px-4 py-2 rounded-lg hover:primaryColor-800"
                            onClick={handleClosePopup}
                        >
                            schließen
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
