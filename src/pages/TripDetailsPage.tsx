import TripDetails from "../components/TripDetails";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { City } from "../components/Map";
import { Activities } from "../components/NewTripForm";
import axios from "axios";

export type Trip = {
  title: string;
  waypoints: City[];
  startingCity: string;
  destination: string;
  attractions: Activities[];
  totalDistance: number;
  totalTime: number;
  _id: string;
};

function TripDetailsPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState({} as Trip);

  const { tripId } = useParams();
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const getTripDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trip/${tripId}`);
      setTrip(response.data.trip as Trip);
      setIsLoading(false);
    } catch (error) {
      console.log("Could not fetch trip details");
    }
  };

  useEffect(() => {
    getTripDetails();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <h2>{trip.title}</h2>
          <TripDetails
            cities={trip.waypoints}
            attractions={trip.attractions}
            totalDistance={trip.totalDistance}
            totalTime={trip.totalTime}
          />
        </>
      )}
    </div>
  );
}

export default TripDetailsPage;
