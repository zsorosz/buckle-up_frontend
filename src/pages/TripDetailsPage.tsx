import TripDetails from "../components/TripDetails";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { City } from "../components/Map";
import { Activities } from "../components/NewTripForm";
import { TripContext } from "../contexts/TripContext";
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

  const { tripData, setTripData } = useContext(TripContext);

  const { tripId } = useParams();
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const getTripDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trip/${tripId}`);
      setTripData(response.data.trip as Trip);
      setIsLoading(false);
    } catch (error) {
      console.log("Could not fetch trip details");
    }
  };

  useEffect(() => {
    getTripDetails();
  }, []);

  return (
    <main>
      {isLoading || !tripData ? (
        <p>Loading....</p>
      ) : (
        <div className="trip-details-ctn">
          <TripDetails />
        </div>
      )}
    </main>
  );
}

export default TripDetailsPage;
