import { config } from "constants/mapboxDemo";
import Mapbox from "components/Mapbox";

const JourneyPage = () => {
  return (
    <div>
      <Mapbox config={config} />
    </div>
  );
};

export default JourneyPage;
