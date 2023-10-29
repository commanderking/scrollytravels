import MapboxContainer from "features/scrollymap/MapboxContainer";
import { config } from "constants/scrollymapConfig";

const MapboxDemo = () => {
  return <MapboxContainer config={config} />;
};

export default MapboxDemo;
