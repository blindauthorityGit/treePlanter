import { useState, useEffect, useContext } from "react";
import Data from "../../components/map/data";
import { fetchAddressFromCoordinates } from "../../functions/getAdress";
//ASSETS
import Tree1 from "../../assets/trees/tree1.png";
import Tree2 from "../../assets/trees/tree2.png";
import Tree3 from "../../assets/trees/tree3.png";
import Tree4 from "../../assets/trees/tree4.png";

// STORE
import { DataContext } from "../../context/dataContext";
import { PaymentProvider, PaymentContext } from "../../context/paymentContext";

function TreeDonationModal(props) {
    const [activeStep, setActiveStep] = useState(0);
    const [id, setID] = useState(0);
    const [adress, setAdress] = useState("");

    // STORE
    const [data, setData] = useContext(DataContext);
    const { isOpen, setIsOpen, toggleSidebarRight } = useContext(PaymentContext);

    // FUNCTION TO UPDATE DATA
    const handleUpdate = (index, newValue) => {
        setData((prevData) => {
            // Use the map method to update the element at the specified index
            return prevData.map((element, i) => {
                if (i === index) {
                    // Update the property of the element
                    return {
                        ...element,
                        propertyToBeUpdated: newValue,
                    };
                }
                return element;
            });
        });
    };

    useEffect(() => {
        setID(props.id);
        const fetchAddress = async () => {
            const coordinates = Data[props.id].geometry.coordinates;
            const address = await fetchAddressFromCoordinates(coordinates);
            setAdress(address);
            setTree(address);
        };

        fetchAddress();
        console.log(data);
    }, [props.id]);

    const [tree, setTree] = useState("");
    const [donationAmount, setDonationAmount] = useState(0);
    const [anonymousDonation, setAnonymousDonation] = useState(false);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [treeIcon, setTreeIcon] = useState("");
    const [receiptNeeded, setReceiptNeeded] = useState(false);

    const handleNextStep = () => {
        // Implement next step logic
        setActiveStep(activeStep + 1);
    };

    const handlePreviousStep = () => {
        setActiveStep(activeStep - 1);
    };

    const handleTreeSelection = (selectedTree) => {
        setTreeIcon(selectedTree);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleDonationAmountChange = (event) => {
        setDonationAmount(event.target.value);
    };

    const handleAnonymousDonationChange = (event) => {
        setAnonymousDonation(event.target.checked);
    };

    const handleReceiptNeededChange = (event) => {
        setReceiptNeeded(event.target.checked);
    };

    function getIconSizeString(size) {
        switch (size) {
            case 0:
                return [60, 125];
            case 1:
                return [70, 70];
            case 2:
                return [70, 120];
            case 3:
                return [80, 110];
            default:
                return "unknown";
        }
    }

    const handlePayment = () => {
        // Implement payment logic
        console.log(name, comment, treeIcon, donationAmount, tree);
        const formData = {
            id: id,
            name: name,
            comment: comment,
            tree: treeIcon,
            sum: donationAmount,
            location: tree,
            iconSize: getIconSizeString(treeIcon),
        };
        console.log(formData);
        console.log(document.getElementById(`${id}`));
        console.log(Tree2.src);
        const el = document.getElementById(`${id}`);
        el.style.backgroundImage = `url(${Tree2.src})`;
        console.log(formData);
        setData((prevState) => {
            const newData = [...prevState];
            console.log(newData);
            data[id].properties.isClaimed = true;
            data[id].properties.iconSize = formData.iconSize;
            data[id].donator.name = formData.name;
            data[id].donator.avatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
            data[id].donator.kommentar = formData.comment;
            data[id].donator.sum = formData.sum;
            data[id].donator.tree = formData.tree;
            // newData[id] = formData;
            return newData;
        });
        toggleSidebarRight();
    };

    const steps = [
        {
            title: "Mit Ihrer Spende können Sie an der angegebenen Adresse einen Baum pflanzen lassen!",
            content: (
                <>
                    <p className="font-sans  mt-4">
                        Wählen Sie eine beliebige Summe und helfen Sie uns die Stadt grüner werden zu lassen.
                    </p>
                    <p className="font-sans  mt-4">
                        Ihre Spende wird mit einer Plakette am Baum und einem Eintrag in unserer Spenderliste geehrt.
                    </p>
                    <div className="grid grid-cols-12 text-lg font-sans font-semibold my-12">
                        <div className="col-span-4">Baum Nr.{id}</div>
                        <div className="col-span-8">
                            {" "}
                            <p>{adress}</p>
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: "Ihre Spende (in €)",
            content: (
                <>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="0"
                            max="400"
                            value={donationAmount}
                            onChange={handleDonationAmountChange}
                            className="w-64 h-2 bg-gray-400 rounded-full appearance-none focus:outline-none focus:bg-gray-500"
                        />
                        <label className="text-xl font-medium">{donationAmount}</label>
                    </div>
                    <br />
                    <div className="flex items-center space-x-2">
                        <input
                            id="anonymousDonation"
                            type="checkbox"
                            checked={anonymousDonation}
                            onChange={handleAnonymousDonationChange}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="anonymousDonation" className="text-gray-700 font-sans cursor-pointer">
                            Anonyme Spende?
                        </label>
                    </div>
                </>
            ),
        },
        {
            title: "Ihre Daten",
            content: (
                <div className="grid grid-cols-2 gap-4 mt-6 mb-12 font-sans">
                    <label htmlFor="name" className="font-bold">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="px-2 py-1 border border-gray-400 rounded"
                        value={name}
                        onChange={handleNameChange}
                    />

                    <label htmlFor="comment" className="font-bold">
                        Kommentar (optional, max 140 Zeichen):
                    </label>
                    <textarea
                        id="comment"
                        maxLength="140"
                        className="px-2 py-1 border border-gray-400 rounded"
                        value={comment}
                        onChange={handleCommentChange}
                    ></textarea>
                </div>
            ),
        },
        {
            title: "Wählen Sie einen Baum, der auf unserer Karte erscheinen soll",
            content: (
                <div className="grid grid-cols-4 gap-4 mt-6">
                    <button
                        onClick={() => handleTreeSelection(0)}
                        className={`border rounded p-2 ${treeIcon === 0 ? "bg-primaryColor-100" : ""}`}
                    >
                        <img src={Tree1.src} alt="Tree 1" />
                        Tree 1
                    </button>
                    <button
                        onClick={() => handleTreeSelection(1)}
                        className={`border rounded p-2 ${treeIcon === 1 ? "bg-primaryColor-100" : ""}`}
                    >
                        <img src={Tree2.src} alt="Tree 2" />
                        Tree 2
                    </button>
                    <button
                        onClick={() => handleTreeSelection(2)}
                        className={`border rounded p-2 ${treeIcon === 2 ? "bg-primaryColor-100" : ""}`}
                    >
                        <img src={Tree3.src} alt="Tree 3" />
                        Tree 3
                    </button>
                    <button
                        onClick={() => handleTreeSelection(3)}
                        className={`border rounded p-2 ${treeIcon === 3 ? "bg-primaryColor-100" : ""}`}
                    >
                        <img src={Tree4.src} alt="Tree 4" />
                        Tree 4
                    </button>
                </div>
            ),
        },
        {
            title: "Zusammenfassung",
            content: (
                <>
                    <p className=" font-bold mb-2">{tree}</p>
                    <p className="mb-2">{`Spendensumme: ${donationAmount}`}</p>
                    <p className="mb-2">{`Name: ${name}`}</p>
                    <p className="mb-2">{`Kommentar: ${comment}`}</p>
                    <p className="mb-2">{`Baum: ${treeIcon}`}</p>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={receiptNeeded}
                            onChange={handleReceiptNeededChange}
                            className="mr-2"
                        />
                        <label>Quittung benötigt</label>
                    </div>
                </>
            ),
        },
    ];

    return (
        <div className="p-16">
            <h2 className="font-sans text-3xl uppercase font-bold mb-12">
                Helfen Sie uns, <span className="text-primaryColor-600">grüner</span> zu werden
            </h2>
            <div>
                <h3 className="font-sans text-lg font-semibold mt-6">{steps[activeStep].title}</h3>
                <div>{steps[activeStep].content}</div>
                <div>
                    {activeStep > 0 && (
                        <button
                            className="bg-primaryColor-700 font-sans myButton z-30 mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-white lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                            onClick={handlePreviousStep}
                        >
                            Zurück
                        </button>
                    )}
                    {activeStep < steps.length - 1 ? (
                        <button
                            className="bg-primaryColor font-sans myButton z-30 mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-white lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                            onClick={handleNextStep}
                        >
                            Weiter
                        </button>
                    ) : (
                        <button
                            className="bg-primaryColor font-sans myButton z-30 mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-white lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                            onClick={handlePayment}
                        >
                            Pay
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TreeDonationModal;
