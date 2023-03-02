import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MapPage() {
    mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9oYW5uZXNidWNobmVyIiwiYSI6ImNsZWZuMGVrdjBzaWkzb295eXc5Z3VwZGcifQ.eLOflmzAspD8j7ldIWvawA";

    const mapContainer = useRef(null);

    const geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    message: "Foo",
                },
                geometry: {
                    type: "Point",
                    coordinates: [-66.324462, -16.024695],
                },
            },
            {
                type: "Feature",
                properties: {
                    message: "Bar",
                },
                geometry: {
                    type: "Point",
                    coordinates: [-61.21582, -15.971891],
                },
            },
            {
                type: "Feature",
                properties: {
                    message: "Baz",
                },
                geometry: {
                    type: "Point",
                    coordinates: [-63.292236, -18.281518],
                },
            },
        ],
    };

    useEffect(() => {
        // Initialize map
        const map = new Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [8.69552, 50.02388],
            pitch: 45,
            zoom: 12.5,
        });

        // Load 3D model
        const loader = new GLTFLoader();
        loader.load("/tree3.glb", (gltf) => {
            console.log("loaded");
            // Create a Three.js object for each feature in the geojson data
            geojson.features.forEach((feature) => {
                const { coordinates } = feature.geometry;

                // Create a new Three.js object for the model
                const object = gltf.scene.clone();
                object.position.set(coordinates[0], coordinates[1], 0);
                object.scale.set(0.1, 0.1, 0.1); // scale the model to an appropriate size
                object.lookAt(0, 0, 0); // make the model face the camera

                // Add the object to the Three.js scene
                map.on("render", () => {
                    const canvas = map.getCanvas();
                    const renderer = new THREE.WebGLRenderer({
                        canvas,
                        alpha: true,
                        antialias: true,
                    });
                    const scene = new THREE.Scene();
                    scene.add(object);
                    renderer.render(scene, camera);
                });
            });
        });
    }, []);

    return <div className="col-span-12" id="map" ref={mapContainer} style={{ height: "100vh" }} />;
}

export default MapPage;
