import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MapPage() {
    mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9oYW5uZXNidWNobmVyIiwiYSI6ImNsZWZuMGVrdjBzaWkzb295eXc5Z3VwZGcifQ.eLOflmzAspD8j7ldIWvawA";

    const mapContainer = useRef(null);
    const rendererContainer = useRef(null);

    useEffect(() => {
        // Initialize map
        const map = new Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [-73.985664, 40.748817],
            pitch: 45,
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            antialias: true,
        });
        // const layer = new window.MapboxLayer({
        //     id: "threejs-layer",
        //     type: "custom",
        //     renderingMode: "3d",
        //     onAdd(map, gl) {
        //         renderer.setPixelRatio(window.devicePixelRatio);
        //         renderer.setSize(gl.canvas.width, gl.canvas.height);
        //         rendererContainer.current.appendChild(renderer.domElement);
        //         map.triggerRepaint();
        //     },
        //     render(gl, matrix) {
        //         const cameraMatrix = new THREE.Matrix4().fromArray(matrix);
        //         const cameraPosition = new THREE.Vector3().setFromMatrixPosition(cameraMatrix);
        //         const cameraRotation = new THREE.Quaternion().setFromRotationMatrix(cameraMatrix);
        //         const viewMatrix = new THREE.Matrix4().compose(
        //             cameraPosition,
        //             cameraRotation,
        //             new THREE.Vector3(1, 1, 1)
        //         );
        //         const projectionMatrix = new THREE.Matrix4().fromArray(map._glViewProjectionMatrix);
        //         const mvpMatrix = new THREE.Matrix4().multiplyMatrices(viewMatrix, projectionMatrix);

        //         renderer.state.reset();
        //         renderer.render(scene, camera);
        //         map.triggerRepaint();
        //     },
        // });
        map.on("style.load", () => {
            // Insert the layer beneath any symbol layer.
            const layers = map.getStyle().layers;
            const labelLayerId = layers.find((layer) => layer.type === "symbol" && layer.layout["text-field"]).id;

            // The 'building' layer in the Mapbox Streets
            // vector tileset contains building height data
            // from OpenStreetMap.
            map.addLayer(
                {
                    id: "add-3d-buildings",
                    source: "composite",
                    "source-layer": "building",
                    filter: ["==", "extrude", "true"],
                    type: "fill-extrusion",
                    minzoom: 15,
                    paint: {
                        "fill-extrusion-color": "#aaa",

                        // Use an 'interpolate' expression to
                        // add a smooth transition effect to
                        // the buildings as the user zooms in.
                        "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
                        "fill-extrusion-base": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "min_height"],
                        ],
                        "fill-extrusion-opacity": 0.6,
                    },
                },
                labelLayerId
            );
        });

        // Initialize three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add lights to the scene
        const light1 = new THREE.AmbientLight(0xffffff, 0.5);
        const light2 = new THREE.PointLight(0xffffff, 0.5);
        scene.add(light1, light2);

        // Load 3D model
        const loader = new GLTFLoader();
        loader.load("/tree.glb", (gltf) => {
            console.log("Model loaded successfully!");

            const model = gltf.scene;
            // Modify the model as needed
            model.scale.set(100, 100, 100); // example scaling

            const coords = [-73.985664, 40.748817]; // Example coordinates
            const position = map.project(coords);
            model.position.set((position.x / window.innerWidth) * 2 - 1, -(position.y / window.innerHeight) * 2 + 1, 0);

            scene.add(model);
        });

        // Render three.js scene
        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Position marker on map
        const markerCoords = [-74.006756, 40.713047]; // Example coordinates
        const markerPosition = map.project(markerCoords);
        camera.position.set(
            (markerPosition.x / window.innerWidth) * 2 - 1,
            -(markerPosition.y / window.innerHeight) * 2 + 1,
            2
        );
    }, []);

    return (
        <div className="col-span-12" style={{ height: "100vh" }}>
            <div ref={mapContainer} style={{ height: "100%" }} />
            <div
                ref={rendererContainer}
                style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
            />
        </div>
    );
}

export default MapPage;
