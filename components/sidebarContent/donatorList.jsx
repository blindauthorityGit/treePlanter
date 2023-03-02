import React, { useState, useEffect, useContext, useRef } from "react";
import MainContainer from "../layout/mainContainer";
import ReactPaginate from "react-paginate";
import ListItem from "./items/listItem";
import Data from "../map/data";

const DonatorList = (props) => {
    const [itemsAll, setItemsAll] = useState(Data);
    const [items, setItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const [windowSize, setWindowSize] = useState(getWindowSize());

    const listRef = useRef();

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
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const itemsPerPage = Math.floor(windowSize.innerHeight / 115);
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
        console.log(">Data");
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
                <h2 className="font-sans text-3xl font-bold text-primaryColor-900 uppercase">Unsere Stadtvergrüner</h2>
                <hr className="mb-8" />
                {items && (
                    <>
                        {items[currentPage].map((e, i) => {
                            console.log(e);
                            if (i < itemsPerPage && e.properties.isClaimed) {
                                return (
                                    <ListItem
                                        ref={listRef}
                                        onClick={props.onClick}
                                        onHover={onHover}
                                        onLeave={onLeave}
                                        e={e}
                                    ></ListItem>
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

export default DonatorList;
