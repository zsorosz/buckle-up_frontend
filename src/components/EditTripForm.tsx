import { useContext, useEffect, useState } from "react";
import { City } from "./Map";
import Map from "./Map";
import { useParams } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";

import axios from "axios";
import WaypointInput from "./WaypointInput";

function EditTripForm(): JSX.Element {
  const [waypoints, setWaypoints] = useState([] as City[]);

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
      const waypointArr: City[] = [];
      tripData.waypoints.map((waypoint) => {
        waypointArr.push(waypoint);
      });
      setWaypoints(waypointArr);
    }
  }, [tripData]);

  return (
    <>
      {tripData ? (
        <main className="trip-ctn edit-trip-ctn">
          {waypoints.map((city: City, index: number) => (
            <div key={city.name}>
              <WaypointInput
                city={city.name}
                index={index}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
              />
            </div>
          ))}
          <section className="trip-map">
            <Map
              cities={waypoints as City[]}
              setTotalDistance={setTotalDistance}
              setTotalTime={setTotalTime}
            />
          </section>
        </main>
      ) : null}
    </>
  );
}

export default EditTripForm;
