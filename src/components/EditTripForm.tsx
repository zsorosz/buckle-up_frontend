import { useContext, useEffect, useState } from "react";
import { City } from "./Map";
import Map from "./Map";
import { useParams } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";

import axios from "axios";
import WaypointInput from "./WaypointInput";

function EditTripForm(): JSX.Element {
  const [waypoints, setWaypoints] = useState([] as City[]);
  const [seed, setSeed] = useState(1);

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
        <main className="edit-trip-ctn">
          <section className="edit-waypoints-input-ctn">
            {waypoints.map((city: City, index: number) => (
              <WaypointInput
                key={city.name}
                city={city.name}
                index={index}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
                setSeed={setSeed}
              />
            ))}
          </section>
          <section className="trip-map">
            <Map
              key={seed}
              cities={waypoints as City[]}
              setTotalDistance={setTotalDistance}
              setTotalTime={setTotalTime}
            />
          </section>
          <div className="trip-data edit-trip-data">
            <div>
              <h5>Total Distance:</h5>{" "}
              {totalDistance &&
                Math.round((totalDistance + Number.EPSILON) * 100) / 100}{" "}
              km
            </div>
            <div>
              <h5>Total Driving Time:</h5>
              {totalTime && Math.floor(totalTime / 3600)} h{" "}
              {totalTime && Math.round((totalTime / 60) % 60)} min
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}

export default EditTripForm;
