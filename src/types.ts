import { Activities } from "./components/NewTripForm";
import { City } from "./components/Map";

export interface UserData {
  username: string;
  email: string;
  trips: Trip[];
  _id: string
}

export interface Trip {
  _id: string;
  title: string;
  startingCity: string;
  destination: string;
  createdAt: string;
  updatedAt: string;
  totalDistance: number;
  totalTime: number;
  attractions: Activities[];
  waypoints: City[];
}
