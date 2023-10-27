import { Place } from "constants/scrollymapConfig";

type MarkerProps = {
  onClick: (coordinates: [number, number]) => void;
  children?: React.ReactNode[];
  place: Place;
};

const Marker = ({ onClick, children, place }: MarkerProps) => {
  const _onClick = () => {
    const targetScroll = document.getElementById(place.id);
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

export default Marker;
