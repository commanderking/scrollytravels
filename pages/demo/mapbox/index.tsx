import { useRef, useEffect, useState, createRef } from "react";
import { createRoot } from "react-dom/client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import scrollama from "scrollama";

type Place = {
  id: string;
  description: string;
  title: string;
  coordinates: [number, number];
};

const places: Place[] = [
  {
    id: "jth",
    description: "Hoho! It's Jassid Tea House!",
    title: "Jassid Tea House",
    coordinates: [121.555204, 25.038152],
  },
  {
    id: "jsy",
    description: "Hoho! It's Jing Sheng Yu!",
    title: "Jing Sheng Yu",
    coordinates: [121.52923069550262, 25.032385868672776],
  },
  {
    id: "sbt",
    description: "Hoho! It's Stop By Teahouse!",
    title: "Stop By Teahouse",
    coordinates: [121.52922476548716, 25.0302556757552],
  },
  {
    id: "lcg",
    description: "Old tea house",
    title: "老茶罐 (Old Tea Can)",
    coordinates: [121.52963879264816, 25.030005491295665],
  },
];

type MarkerProps = {
  onClick: (coordinates: [number, number]) => void;
  children?: React.ReactNode[];
  place: Place;
};

const Marker = ({ onClick, children, place }: MarkerProps) => {
  const _onClick = () => {
    const targetScroll = document.getElementById(place.id);
    console.log({ targetScroll });
    targetScroll?.scrollIntoView({ behavior: "smooth" });
    onClick(place.coordinates);
  };

  return (
    <button
      id={`button-${place.id}`}
      onClick={_onClick}
      className="marker bg-pink-400 border-2 border-white p-[8px] rounded-full"
    >
      {children}
    </button>
  );
};

const MapboxDemo = () => {
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
              <ChapterComponent
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

type ChapterProps = {
  id: string;
  title: string;
  description: string;
  currentChapterID: string;
};

const ChapterComponent = ({
  id,
  title,
  description,
  currentChapterID,
}: ChapterProps) => {
  const classList = id === currentChapterID ? "step active" : "step";

  return (
    <div id={id} className={classList}>
      <div className="light">
        {title && <h3 className="title">{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default MapboxDemo;
