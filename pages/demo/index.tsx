import { Wrapper } from "@googlemaps/react-wrapper";
import { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { IconMug } from "@tabler/icons-react";
export default function App() {
  return (
    <Wrapper
      //   apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
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
  const [map, setMap] = useState();
  const ref = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, mapOptions);
    setMap(map);
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ width: "100%", height: "100vh" }} />
      {/* <Markers map={map} /> */}
      {map && <Weather map={map} />}
    </>
  );
}

function buildContent() {
  const content = document.createElement("div");
  content.innerHTML = `
      <div class="icon">Hello!!</div>`;
  return content;
}

const Markers = ({ map }) => {
  useEffect(() => {
    console.log(map);
    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 25.048588266596745, lng: 121.51726690153174 },
      title: "Taipei",
      //   content: buildContent(),
    });

    const infoWindow = new window.google.maps.InfoWindow();

    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  }, [map]);

  return null;
};

const weatherData = {
  A: {
    name: "Tea to Tea",
    position: { lat: 25.032875879371787, lng: 121.52939275596029 },
    climate: "Raining",
    temp: 20,
    fiveDay: [15, 18, 12, 22, 20],
  },
  B: {
    name: "Jing Sheng Yu",
    position: { lat: 25.032385868672776, lng: 121.52923069550262 },
    climate: "Cloudy",
    temp: 20,
    fiveDay: [15, 18, 12, 22, 20],
  },
  C: {
    name: "Stop By Teahouse",
    position: { lat: 25.03025567575529, lng: 121.52922476548716 },
    climate: "Sunny",
    temp: 20,
    fiveDay: [15, 18, 12, 22, 20],
  },
};

function Weather({ map }) {
  const [data, setData] = useState(weatherData);
  const [highlight, setHighlight] = useState();
  const [editing, setEditing] = useState();

  return (
    <>
      {editing && (
        <Editing
          weather={data[editing]}
          update={(newWeather) => {
            setData((existing) => {
              return { ...existing, [editing]: { ...newWeather } };
            });
          }}
          close={() => setEditing(null)}
        />
      )}
      {Object.entries(data).map(([key, weather]) => (
        <Marker
          key={key}
          map={map}
          position={weather.position}
          onClick={() => setEditing(key)}
        >
          <div
            style={{
              padding: "0.5rem",
              background: "white",
              transition: "all 0.3s ease-out",
              position: "relative",
              borderRadius: "5px",
              color: "white",
              border: "1px solid green",
            }}
          >
            <IconMug color="green" />
            {/* <h2>{weather.climate}</h2>
            <div>{weather.temp}c</div>
            {highlight === key || editing === key ? (
              <div className="five-day">
                <p>Next 5</p>
                <p>{weather.fiveDay.join(", ")}</p>
              </div>
            ) : null} */}
          </div>
        </Marker>
      ))}
    </>
  );
}
function Editing({ weather, update, close }) {
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
      <h2>Editing {weather.name}</h2>

      <label htmlFor="climate">Climate</label>
      <select
        id="climate"
        value={weather.climate}
        onChange={(e) => update({ ...weather, climate: e.target.value })}
      >
        {["Sunny", "Cloudy", "Raining"].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      <label htmlFor="temp">Temperature</label>
      <input
        id="temp"
        type="number"
        value={weather.temp}
        onChange={(e) => update({ ...weather, temp: e.target.value })}
      />

      <button type="button" onClick={() => close()}>
        Close
      </button>
    </div>
  );
}

function Marker({ map, position, children, onClick }) {
  const rootRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");
      rootRef.current = createRoot(container);

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
      });

      console.log(markerRef.current);
    }

    return () => (markerRef.current.map = null);
  }, []);

  useEffect(() => {
    rootRef.current.render(children);
    markerRef.current.position = position;
    markerRef.current.map = map;
    const listener = markerRef.current.addListener("click", onClick);
    return () => listener.remove();
  }, [map, position, children, onClick]);
}
