import { useState, useEffect } from "react";
import { SuggestionData } from "./SearchSuggestions";
import axios from "axios";
import { City } from "./Map";

type WaypointProps = {
  waypoints: City[];
  setWaypoints: (data: City[]) => void;
  city: string;
  index: number;
  setSeed: (data: number) => void;
};

function WaypointInput({
  waypoints,
  setWaypoints,
  city,
  index,
  setSeed,
}: WaypointProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([] as SuggestionData[]);
  const [selected, setSelected] = useState(city as string);

  const LOCATION_API_KEY: string = import.meta.env.VITE_LOCATION_KEY as string;

  const typeAhead = async (): Promise<void> => {
    const res = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${LOCATION_API_KEY}&q=${query}&limit=5&tag=place:city,place:town,place:village`
    );
    setSuggestions(res.data);
  };

  const saveWaypoint = (city: SuggestionData): void => {
    setSelected(city.display_name);
    const newWaypoint = {
      name: city.display_name,
      coord: [Number(city.lat), Number(city.lon)],
    };
    const waypointsArr: City[] = structuredClone(waypoints);
    waypointsArr.splice(index, 1, newWaypoint);
    setWaypoints(waypointsArr);
    setSeed(Math.random());
  };

  const deleteWaypoint = () => {
    const filteredArr = waypoints.filter((el, i) => i !== index);
    setWaypoints(filteredArr);
    setSeed(Math.random());
  };

  useEffect(() => {
    typeAhead();
  }, [query]);

  return (
    <div>
      <div className="edit-waypoint-input">
        <input
          type="text"
          value={selected}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(e.target.value);
          }}
        />

        <button
          className="delete-btn"
          onClick={() => {
            deleteWaypoint();
          }}
        >
          -
        </button>
        <button className="primary-btn">+</button>
      </div>
      <div className="search-suggestion edit-suggestion">
        {suggestions.length
          ? suggestions.map((city: SuggestionData) => (
              <div
                key={city.place_id}
                onClick={(e) => {
                  e.preventDefault();
                  setSuggestions([]);
                  console.log(city);
                  saveWaypoint(city);
                }}
              >
                {city.display_name}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default WaypointInput;
