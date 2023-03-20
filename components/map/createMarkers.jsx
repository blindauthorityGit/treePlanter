// Comps
import PersonalData from "./data/personalData";
import DonatePopup from "./data/donatePopup";

export default function createMarkers() {
    data.map(
        (marker, i) => {
            // Create a DOM element for each marker.
            let personalData = "";
            if (marker.properties.isClaimed) {
                personalData = ReactDOMServer.renderToString(
                    <PersonalData
                        id={marker.properties.id}
                        name={marker.donator.name}
                        image={marker.donator.avatar}
                        sum={marker.donator.sum}
                        kommentar={marker.donator.kommentar}
                        dataID={marker.properties.id}
                    />
                );
            } else if (!marker.properties.isClaimed) {
                personalData = ReactDOMServer.renderToString(
                    <DonatePopup
                        id={marker.properties.id}
                        coordinates={marker.geometry.coordinates}
                        dataID={marker.properties.id}
                        sum={marker.donator.sum}
                        donators={data.filter((e) => e.properties.isClaimed)}
                    />
                );
            }

            // marker.properties.isClaimed
            //     ? (personalData = `<h1 class="text-2xl">Baum Nr.${i}</h1><p class="text-lg">${marker.donator.name}</p>`)
            //     : "";
            // Create a unique identifier for the popup
            const popupId = `popup-${i}`;

            const popup = new mapboxgl.Popup({ offset: 25, maxWidth: isMobile ? "220px" : "300px" }).setHTML(
                personalData
            );
            popups[popupId] = popup;
            const el = document.createElement("div");
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            (el.id = marker.properties.id), (el.className = "marker");
            marker.properties.isClaimed
                ? (() => {
                      switch (marker.donator.tree) {
                          case 0:
                              return (el.style.backgroundImage = `url(${Tree1.src})`);
                          case 1:
                              return (el.style.backgroundImage = `url(${Tree2.src})`);
                          case 2:
                              return (el.style.backgroundImage = `url(${Tree3.src})`);
                          case 3:
                              return (el.style.backgroundImage = `url(${Tree4.src})`);
                          default:
                              return (el.style.backgroundImage = `url(${Tree1Claimed.src})`);
                      }
                  })()
                : (el.style.backgroundImage = `url(${Tree1Unclaimed.src})`);
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = "100%";
            el.classList.add("transition-all", "hover:scale-110");

            el.addEventListener("click", (e) => {
                console.log(e.target);
            });

            // Add markers to the map.
            marker.properties.isClaimed
                ? new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map)
                : new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(popup).addTo(map);
            setMapLoaded(map);

            popup.on("open", () => {
                setPopupOpen(true);

                const button = document.getElementById("myButton");
                console.log(button);
                if (button) {
                    button.addEventListener("click", (e) => {
                        toggleSidebarRight();
                        const index = e.currentTarget.dataset.id;
                        setID(index);
                        const coordinates = Data[index].geometry.coordinates;
                        console.log(index, e.currentTarget);
                        console.log(e.currentTarget.dataset.id, Data[index].geometry.coordinates);
                        setFlyToLocation(coordinates);
                        popup.remove();
                    });
                }
            });
            popup.on("close", () => {
                setPopupOpen(false);
            });
            map.on("closeAllPopups", () => {
                popup.remove();
            });
            map.on("zoom", () => {
                const zoomLevel = map.getZoom();
                if (zoomLevel > 10) {
                    setData([]);
                    updateIconSizes(zoomLevel);
                }
            });
        },
        [data, map, isMobile, isTablet, isDesktop]
    );
}
