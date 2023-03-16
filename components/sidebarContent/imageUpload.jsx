import React, { useState, useEffect, useContext } from "react";
import ImageUploading from "react-images-uploading";

import { MdPhotoCamera } from "react-icons/md";
import Resizer from "react-image-file-resizer";

// STORE
import { DataContext } from "../../context/dataContext";

function ImageUpload(props) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [size, setSize] = useState(0);
    const maxNumber = 1;
    const maxSize = 1024;

    const [data, setData] = useContext(DataContext);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const onChange = async (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        const fileSizeMB = imageList[0].file.size / 1024 ** 2;
        setSize(fileSizeMB);
        console.log(fileSizeMB);
        if (fileSizeMB <= maxSize) {
            setImages(imageList);
            window.localStorage.setItem("image", imageList[0].data_url);

            setError(false);
        } else {
            setError(true);
        }
        console.log(data);
    };

    // const onChange = async (imageList) => {
    //     try {
    //         const file = imageList[0];
    //         const image = await resizeFile(file);
    //         console.log(image);
    //         setImages(image);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     console.log(images, images[0]);
    //     if (images.length != 0) {
    //         setData({ ...data, image: images });
    //     }
    // }, [images]);

    return (
        <div className="name grid grid-cols-12 mt-2 sm:mt-6 col-span-12">
            <div className="col-span-2 flex items-center">
                <div data-tip={props.dataTip} className="text-5xl font-black opacity-50">
                    <MdPhotoCamera />{" "}
                </div>
            </div>
            <div className="col-span-10">
                {/* <input type="file" onChange={onChange} /> */}
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <div className={`upload__image-wrapper  grid grid-cols-12`}>
                            <button
                                style={isDragging ? { color: "red" } : undefined}
                                className={`${
                                    images.length == 0 ? "" : "hidden"
                                }  text-base sm:text-xl p-4 font-semibold opacity-30 col-span-6 sm:col-span-4 text-left hover:opacity-100`}
                                onClick={() => {
                                    onImageUpload();
                                }}
                                {...dragProps}
                            >
                                Bild wählen ...
                            </button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item col-span-12 sm:col-span-12 p-4 flex ">
                                    <div
                                        className="rounded-full h-20 w-20 bg-cover"
                                        style={{ backgroundImage: `url(${image["data_url"]})` }}
                                        alt=""
                                    />
                                    <div className="image-item__btn-wrapper w-2/4  ml-4">
                                        <button
                                            className="font-bold px-6 py-2 hover:bg-gray-200 bg-gray-100 text-xs rounded-xl"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="font-bold mt-4 hover:bg-gray-200 px-6 py-2 bg-gray-100 text-xs rounded-xl"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Löschen
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="error col-span-6">
                                {error && (
                                    <span className="text-red-600  font-bold">
                                        Bild zu groß ({size.toFixed(2)}MB)<br></br>Max {maxSize}MB, bitte anderes Bild
                                        wählen
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    );
}

export default ImageUpload;
