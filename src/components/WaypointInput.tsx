import { useState, useEffect } from "react";
import { SuggestionData } from "./SearchSuggestions";
import axios from "axios";

type WaypointProps = {
  waypoints: string[];
  setWaypoints: (data: string[]) => void;
  city: string;
  index: number;
};

function WaypointInput({
  waypoints,
  setWaypoints,
  city,
  index,
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

  useEffect(() => {
    typeAhead();
  }, [query]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          key={city}
          value={selected}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(e.target.value);
          }}
        />

        <button
          className="delete-btn"
          onClick={() => {
            const filteredArr = waypoints.filter((el, i) => i !== index);
            setWaypoints(filteredArr);
          }}
        >
          X
        </button>
        <button className="primary-btn">+</button>
      </div>
      <div className="search-suggestion">
        {suggestions.length
          ? suggestions.map((city: SuggestionData) => (
              <div
                key={city.place_id}
                onClick={(e) => {
                  e.preventDefault();
                  setSuggestions([]);
                  setSelected(city.display_name);
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
