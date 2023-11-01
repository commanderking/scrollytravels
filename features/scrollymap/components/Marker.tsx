import { Place } from "constants/scrollymapConfig";

type MarkerProps = {
  onClick: (coordinates: [number, number]) => void;
  children?: React.ReactNode[];
  place: Place;
  currentPlace: Place;
};

const Marker = ({ onClick, children, place, currentPlace }: MarkerProps) => {
  const _onClick = () => {
    const targetScroll = document.getElementById(place.id);
    targetScroll?.scrollIntoView({ behavior: "smooth" });
    onClick(place.coordinates);
  };

  const markerColor =
    currentPlace.id === place.id ? "bg-pink-400" : "bg-blue-400";

  return (
    <button
      id={`button-${place.id}`}
      onClick={_onClick}
      className={`marker ${markerColor} border-2 border-white p-[8px] rounded-full`}
    >
      {children}
    </button>
  );
};

export default Marker;
