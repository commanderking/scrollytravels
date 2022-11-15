import { Box } from "@chakra-ui/react";
import { config } from "constants/mapboxDemo";
import Mapbox from "components/Mapbox";

const JourneyPage = () => {
  return (
    <Box>
      <Mapbox config={config} />
    </Box>
  );
};

export default JourneyPage;
