import { useRef, useEffect, useState, createRef } from "react";
import { createRoot } from "react-dom/client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import scrollama from "scrollama";

import { ScrollyMapConfig, Place } from "constants/scrollymapConfig";
import Chapter from "features/scrollymap/components/Chapter";
import Marker from "./components/Marker";

type Props = {
  config: ScrollyMapConfig;
};

const ScrollymapContainer = ({ config }: Props) => {
  const { places } = config;
  const mapContainerRef = useRef(null);
  const [currentPlace, setCurrentPlace] = useState(places[0]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoibWJ4c29sdXRpb25zIiwiYSI6ImNrMm01aG9hdTBlZGwzbXQ1ZXVrNHNmejAifQ.QHQA0N6XPWddCXtvoODHZg";

    mapboxgl.accessToken = accessToken;

    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [121.555204, 25.038152],
      zoom: 12.83,
      pitch: 0,
      bearing: 0,
      // transformRequest: transformRequest,
    });

    setMap(initialMap);
  }, [mapContainerRef]);

  useEffect(() => {
    if (!map) {
      return;
    }
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    const scroller = scrollama();

    map.on("load", function () {
      // setup the instance, pass callback functions
      scroller
        .setup({
          step: ".step",
          offset: 0.5,
          progress: true,
        })
        .onStepEnter((response) => {
          const place = places.find(
            (place) => place.id === response.element.id
          );
          if (!place) {
            return;
          }
          setCurrentPlace(place);
          map.flyTo({
            center: place.coordinates,
          });
        });
    });
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const handleClick = (coordinates: [number, number]) => {
      map.flyTo({
        center: coordinates,
      });
    };

    const markers = places.map((place) => {
      const ref = createRef<HTMLElement>();
      // @ts-ignore - Create a new DOM node and save it to the React ref
      ref.current = document.createElement("div");
      createRoot(ref.current).render(
        <Marker
          onClick={handleClick}
          place={place}
          currentPlace={currentPlace}
        />
      );

      const marker = new mapboxgl.Marker(ref.current)
        .setLngLat(place.coordinates)
        .addTo(map);

      return marker;
    });

    // Removes all previous markers if currentPlace changes
    return () => {
      markers.map((marker) => {
        marker.remove();
      });
    };
  }, [map, currentPlace]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="absolute top right left bottom"
        style={{ position: "fixed" }}
      />
      <div id="story" className="w-6/12">
        <div id="header" className="light">
          <h2 className="text-3xl">{config.title}</h2>
          <p>{config.description}</p>
        </div>
        <div className="pt-[10vh] pb-[10vh]">
          {places.map((place) => {
            return (
              <Chapter
                id={place.id}
                key={place.title}
                title={place.title}
                description={place.description}
                currentChapterID={currentPlace.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollymapContainer;
