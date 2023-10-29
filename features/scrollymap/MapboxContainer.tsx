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
  const [currentChapter, setCurrentChapter] = useState(places[0]);

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoibWJ4c29sdXRpb25zIiwiYSI6ImNrMm01aG9hdTBlZGwzbXQ1ZXVrNHNmejAifQ.QHQA0N6XPWddCXtvoODHZg";

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [121.555204, 25.038152],
      zoom: 12.83,
      pitch: 0,
      bearing: 0,
      // transformRequest: transformRequest,
    });

    const handleClick = (coordinates: [number, number]) => {
      map.flyTo({
        center: coordinates,
      });
    };

    places.forEach((place) => {
      const ref = createRef<HTMLElement>();
      // @ts-ignore - Create a new DOM node and save it to the React ref
      ref.current = document.createElement("div");
      createRoot(ref.current).render(
        <Marker onClick={handleClick} place={place} />
      );

      new mapboxgl.Marker(ref.current).setLngLat(place.coordinates).addTo(map);
    });

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
          setCurrentChapter(place);
          map.flyTo({
            center: place.coordinates,
          });
        });
    });
  }, [mapContainerRef]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="absolute top right left bottom"
        style={{ position: "fixed" }}
      />
      <div id="story" className="w-6/12">
        <div id="header" className="light">
          Teahouses
        </div>
        <div className="pt-[10vh] pb-[10vh]">
          {places.map((place) => {
            return (
              <Chapter
                id={place.id}
                key={place.title}
                title={place.title}
                description={place.description}
                currentChapterID={currentChapter.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollymapContainer;
