import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RoutingMachine from "./RoutingMachine";
import { useState, useEffect } from "react";

export type City = {
  name: string;
  coord: number[];
};

export type MapProps = {
  cities: City[];
  setTotalDistance?: (prevState: number) => void;
  setTotalTime?: (prevState: number) => void;
};

function Map({
  cities,
  setTotalDistance,
  setTotalTime,
}: MapProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cities.length) {
      setIsLoading(false);
    }
  }, [cities]);

  function CenterMap() {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom());
    });
    return null;
  }

  return (
    <>
      {!isLoading ? (
        <MapContainer
          center={cities[0].coord as [number, number]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <CenterMap />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RoutingMachine
            cities={cities as L.ControlOptions}
            setTotalDistance={setTotalDistance}
            setTotalTime={setTotalTime}
          />
        </MapContainer>
      ) : null}
    </>
  );
}

export default Map;
