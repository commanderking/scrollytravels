import { Wrapper } from "@googlemaps/react-wrapper";
import { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { IconMug } from "@tabler/icons-react";
export default function App() {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      version="beta"
      libraries={["marker"]}
    >
      <MyMap />
    </Wrapper>
  );
}

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_TAIPEI_MAP_ID,
  center: { lat: 25.048588266596745, lng: 121.51726690153174 },
  zoom: 14,
  disableDefaultUI: true,
};

function MyMap() {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, mapOptions);
      setMap(map);
    }
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ width: "100%", height: "100vh" }} />
      {/* <Markers map={map} /> */}
      {map && <Weather map={map} />}
    </>
  );
}

type Place = {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
};

const placesData = {
  A: {
    name: "Tea to Tea",
    position: { lat: 25.032875879371787, lng: 121.52939275596029 },
  },
  B: {
    name: "Jing Sheng Yu",
    position: { lat: 25.032385868672776, lng: 121.52923069550262 },
  },
  C: {
    name: "Stop By Teahouse",
    position: { lat: 25.03025567575529, lng: 121.52922476548716 },
  },
} as const;

function Weather({ map }: { map: google.maps.Map }) {
  const [data] = useState(placesData);
  const [selectedPlace, setSelectedPlace] = useState<
    keyof typeof placesData | null
  >();

  return (
    <>
      {selectedPlace && (
        <MoreInfoModal
          place={data[selectedPlace]}
          close={() => setSelectedPlace(null)}
        />
      )}
      {Object.entries(data).map(([key, weather]) => (
        <Marker
          key={key}
          map={map}
          position={weather.position}
          onClick={() => setSelectedPlace(key as keyof typeof placesData)}
        >
          <div
            style={{
              padding: "0.5rem",
              background: "white",
              transition: "all 0.3s ease-out",
              position: "relative",
              borderRadius: "5px",
              color: "green",
              border: "1px solid green",
            }}
            className="flex"
          >
            <IconMug color="green" size="12" style={{ display: "inline" }} />
            {weather.name}
          </div>
        </Marker>
      ))}
    </>
  );
}

type MoreInfoModalProps = {
  place: Place;
  close: () => void;
};

function MoreInfoModal({ place, close }: MoreInfoModalProps) {
  return (
    <div
      className="editing"
      style={{
        position: "absolute",
        padding: "1rem",
        top: "1rem",
        right: "1rem",
        width: "20%",
        minWidth: "200px",
        background: "white",
        color: "black",
      }}
    >
      <h2>Editing {place.name}</h2>

      <label htmlFor="climate">Climate</label>

      <label htmlFor="temp">Temperature</label>

      <button type="button" onClick={() => close()}>
        Close
      </button>
    </div>
  );
}

type MarkerProps = {
  map: google.maps.Map;
  position: {
    lat: number;
    lng: number;
  };
  children: JSX.Element;
  onClick: () => void;
};

function Marker({ map, position, children, onClick }: MarkerProps) {
  const rootRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");

      // @ts-ignore
      rootRef.current = createRoot(container);

      // @ts-ignore
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
      });
    }
  }, []);

  useEffect(() => {
    if (rootRef?.current && markerRef?.current) {
      // @ts-ignore
      rootRef.current.render(children);
      // @ts-ignore
      markerRef.current.position = position;
      // @ts-ignore
      markerRef.current.map = map;
      // @ts-ignore
      const listener = markerRef.current.addListener("click", onClick);
      return () => listener.remove();
    }
  }, [map, position, children, onClick]);

  return <div></div>;
}
