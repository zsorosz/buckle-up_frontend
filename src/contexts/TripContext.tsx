/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

export type Activities = {
  city: string;
  attractions: string[];
};

export type City = {
  name: string;
  coord: number[];
};
interface TripData {
  title: string;
  waypoints: City[];
  startingCity: string;
  destination: string;
  attractions: Activities[];
  totalDistance: number;
  totalTime: number;
  _id: string;
}

interface TripContextState {
  tripData: TripData | null | undefined;
  setTripData: (data: TripData | null) => void;
  refreshTripData: (updatedTrip: TripData) => void;
}

export const TripContext = createContext<TripContextState>({
  tripData: undefined,
  setTripData: () => {},
  refreshTripData: () => {},
});

const TripContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tripData, setTripData] = useState<TripData | null | undefined>();

  const refreshTripData = (updatedTrip: TripData) => {
    setTripData(updatedTrip);
  };

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        refreshTripData,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContextProvider;
