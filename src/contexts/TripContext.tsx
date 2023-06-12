/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";

export type Activities = {
  city: string;
  attractions: string[];
};

export type City = {
  name: string;
  coord: number[];
};
export interface TripData {
  title: string;
  waypoints: City[];
  startingCity: string;
  destination: string;
  attractions: Activities[];
  totalDistance: number;
  totalTime: number;
  _id?: string;
}

interface TripContextState {
  tripData: TripData | null | undefined;
  setTripData: (data: TripData | null) => void;
  totalDistance: number;
  setTotalDistance: (data: number) => void;
  totalTime: number;
  setTotalTime: (data: number) => void;
  refreshTripData: (updatedTrip: TripData) => void;
  isTripLoading: boolean;
  setIsTripLoading: (state: boolean) => void;
  isTripShowing: boolean;
  setIsTripShowing: (state: boolean) => void;
  saveTrip: () => void;
  deleteTrip: () => void;
  resetTrip: () => void;
}

export const TripContext = createContext<TripContextState>({
  tripData: undefined,
  setTripData: () => {},
  totalDistance: 0,
  setTotalDistance: () => {},
  totalTime: 0,
  setTotalTime: () => {},
  refreshTripData: () => {},
  isTripLoading: false,
  setIsTripLoading: () => {},
  isTripShowing: false,
  setIsTripShowing: () => {},
  saveTrip: () => {},
  deleteTrip: () => {},
  resetTrip: () => {},
});

const TripContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tripData, setTripData] = useState<TripData | null | undefined>();
  const [isTripLoading, setIsTripLoading] = useState(false);
  const [isTripShowing, setIsTripShowing] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const { userData, refreshData } = useContext(SessionContext);

  const navigate = useNavigate();
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const refreshTripData = (updatedTrip: TripData) => {
    setTripData(updatedTrip);
  };

  const saveTrip = async () => {
    const res = await axios.post(`${BASE_URL}/trip/add`, {
      tripData,
      userData,
    });
    refreshData(res.data.updatedUser);
    setTripData(null);
    navigate("/mytrips");
  };

  const deleteTrip = async () => {
    const res = await axios.post(`${BASE_URL}/trip/delete`, {
      tripData,
      userData,
    });
    refreshData(res.data.updatedUser);
    setTripData(null);
    navigate("/mytrips");
  };

  const resetTrip = () => {
    setIsTripShowing(false);
    setTripData(null);
    navigate("/");
  };

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        totalDistance,
        setTotalDistance,
        totalTime,
        setTotalTime,
        refreshTripData,
        isTripLoading,
        setIsTripLoading,
        isTripShowing,
        setIsTripShowing,
        saveTrip,
        resetTrip,
        deleteTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContextProvider;
