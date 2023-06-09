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
  isEditing: boolean;
  setIsEditing: (state: boolean) => void;
  saveTrip: (trip: TripData) => void;
  updateTrip: (updatedTrip: TripData) => void;
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
  isEditing: false,
  setIsEditing: () => {},
  saveTrip: () => {},
  updateTrip: () => {},
  deleteTrip: () => {},
  resetTrip: () => {},
});

const TripContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tripData, setTripData] = useState<TripData | null | undefined>();
  const [isTripLoading, setIsTripLoading] = useState(false);
  const [isTripShowing, setIsTripShowing] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const { userData, refreshData} = useContext(SessionContext);

  const navigate = useNavigate();
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const refreshTripData = (updatedTrip: TripData): void => {
    setTripData(updatedTrip);
  };

  const saveTrip = async (trip: TripData) => {
    const res = await axios.post(`${BASE_URL}/trip/add`, {
      trip,
      userData,
    });
    refreshData(res.data.updatedUser);
    setTripData(null);
    navigate("/mytrips");
  };
  const updateTrip = async (updatedTrip: TripData) => {
    const res = await axios.post(`${BASE_URL}/trip/update`, {
      updatedTrip,
      userData,
    });
    refreshData(res.data.updatedUser);
    setTripData(res.data.updatedTrip);
    navigate(`/${res.data.updatedTrip._id}`);
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
        isEditing,
        setIsEditing,
        saveTrip,
        updateTrip,
        resetTrip,
        deleteTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContextProvider;
