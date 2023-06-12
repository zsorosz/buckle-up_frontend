import { useContext, useEffect, useState } from "react";
// import { City } from "./Map";
// import Map from "./Map";
// import { Activities } from "./NewTripForm";
import { useParams } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";

import axios from "axios";
import WaypointInput from "./WaypointInput";

function EditTripForm(): JSX.Element {
  const [waypoints, setWaypoints] = useState([] as string[]);

  const {
    tripData,
    setTripData,
    totalDistance,
    setTotalDistance,
    totalTime,
    setTotalTime,
    saveTrip,
  } = useContext(TripContext);

  const { tripId } = useParams();
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const getTripDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trip/${tripId}`);
      setTripData(response.data.trip);
    } catch (error) {
      console.log("Could not fetch trip details");
    }
  };
  useEffect(() => {
    getTripDetails();
  }, []);

  useEffect(() => {
    if (tripData) {
      const waypointNames: string[] = [];
      tripData.waypoints.map((waypoint) => {
        waypointNames.push(waypoint.name);
      });
      setWaypoints(waypointNames);
    }
  }, [tripData]);

  return (
    <>
      {tripData ? (
        <main
          className="trip-ctn"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {waypoints.map((city, index) => (
            <div key={index}>
              <WaypointInput
                city={city}
                index={index}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
              />
            </div>
          ))}
        </main>
      ) : null}
    </>
  );
}

export default EditTripForm;
