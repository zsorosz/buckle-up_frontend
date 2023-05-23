import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RoutingMachine from "./RoutingMachine";

export type City = {
  name: string;
  coord: [number, number];
};

export type MapProps = {
  cities: City[];
  setDistance: (prevState: number) => void;
  setTotalTime: (prevState: number) => void;
};

function Map({ cities, setDistance, setTotalTime }: MapProps): JSX.Element {
  function CenterMap() {
    const map = useMapEvent("click", (e) => {
      console.log(e.latlng);
      map.setView(e.latlng, map.getZoom());
    });
    return null;
  }

  return (
    <>
      <MapContainer
        center={cities[0].coord as [number, number]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%", marginTop: "50px" }}
      >
        <CenterMap />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine
          cities={cities as L.ControlOptions}
          setDistance={setDistance}
          setTotalTime={setTotalTime}
        />
      </MapContainer>
    </>
  );
}

export default Map;
