import React, { useState, useEffect, useContext, useRef } from "react";
import MainContainer from "../layout/mainContainer";
import ReactPaginate from "react-paginate";
import TreeListItem from "./items/treeListItem";
import Data from "../map/data";
import { GiConvergenceTarget } from "react-icons/gi";

// FUNCTIONS
import { getUserLocation } from "../../functions/getUserLocation";
import filterByDistance from "../../functions/filterByDistance";

const TreeList = (props) => {
    const [itemsAll, setItemsAll] = useState(Data.filter((e) => !e.properties.isClaimed));
    const [items, setItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const [windowSize, setWindowSize] = useState(getWindowSize());

    const listRef = useRef();

    //LOCATION
    const [location, setLocation] = useState(null);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);
        console.log(windowSize.innerHeight);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        console.log(location);
    }, [location]);

    //& GET USER LOCATION
    function getLocation() {
        const onlyUnclaimed = Data.filter((e) => !e.properties.isClaimed);
        const coords = onlyUnclaimed.map((e) => e.geometry.coordinates);
        getUserLocation()
            .then((location) => {
                setLocation(location);
                return location;
            })
            .then((location) => {
                console.log(coords, Object.values(location), 1);
                filterByDistance(coords, Object.values(location), 6000);
            })
            .catch((error) => console.error(error));
    }

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const itemsPerPage = windowSize.innerHeight <= 844 ? 6 : Math.floor(windowSize.innerHeight / 76);
    // const itemsPerPage = windowSize.innerHeight <= 640 ? 4 : 8;

    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    useEffect(() => {
        console.log(itemsAll.length);
    });

    useEffect(() => {
        setItems(sliceIntoChunks(itemsAll, itemsPerPage));
        console.log(Math.floor(windowSize.innerHeight / 90));
        console.log(listRef.current);
    }, [listRef.current]);

    const claimedArr = Array.from(document.querySelectorAll(".kugel"));

    const onHover = (e) => {};

    const onLeave = (e) => {};

    return (
        <MainContainer noGap width="fixed relative h-full ">
            <div className="col-span-12 md:p-16 sm:pt-0">
                <h2 className="font-sans text-3xl font-bold text-primaryColor-900 uppercase">
                    Diese Plätze warten auf Ihre Bäume
                </h2>
                <hr className="mb-8" />

                {items && (
                    <>
                        {items[currentPage].map((e, i) => {
                            if (i < itemsPerPage && !e.properties.isClaimed) {
                                return (
                                    <TreeListItem
                                        ref={listRef}
                                        onClick={props.onClick}
                                        onHover={onHover}
                                        onLeave={onLeave}
                                        e={e}
                                    ></TreeListItem>
                                );
                            }
                        })}
                    </>
                )}
            </div>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={Math.ceil(itemsAll.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination border flex justify-center items-center mt-5 absolute bottom-0 w-full"}
                pageClassName={"page-item border p-2 w-10 text-center opacity-50"}
                pageLinkClassName={"page-link "}
                previousClassName={"page-item pr-5"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item pl-5"}
                nextLinkClassName={"page-link"}
                activeClassName={"active font-bold opacity-100"}
            />
        </MainContainer>
    );
};

export default TreeList;
