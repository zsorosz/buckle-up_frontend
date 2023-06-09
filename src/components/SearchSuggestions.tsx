import { useState, useEffect } from "react";
import axios from "axios";

type SearchProps = {
  query: string;
  waypoint: string;
  setStartingCity: (arg0: string) => void;
  setDestination: (arg0: string) => void;
};

export type SuggestionData = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox?: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: Address;
};

export type Address = {
  country: string;
  country_code: string;
  county: string;
  name: string;
  state: string;
};

const SearchSuggestions = ({
  query,
  waypoint,
  setStartingCity,
  setDestination,
}: SearchProps): JSX.Element => {
  const [startSuggestions, setStartSuggestions] = useState(
    [] as SuggestionData[]
  );
  const [destSuggestions, setDestSuggestions] = useState(
    [] as SuggestionData[]
  );

  const LOCATION_API_KEY: string = import.meta.env.VITE_LOCATION_KEY as string;

  const typeAhead = async (): Promise<void> => {
    const res = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${LOCATION_API_KEY}&q=${query}&limit=5&tag=place:city,place:town,place:village&dedupe=1`
    );
    waypoint === "start"
      ? setStartSuggestions(res.data)
      : setDestSuggestions(res.data);
  };

  useEffect(() => {
    setTimeout(() => {
      typeAhead();
    }, 1000);
  }, [query]);

  return (
    <div className="search-suggestion">
      {startSuggestions.length
        ? startSuggestions.map((city: SuggestionData) => (
            <div
              key={city.place_id}
              onClick={(e) => {
                e.preventDefault();
                setStartSuggestions([]);
                setStartingCity(
                  `${city.address.name}, ${
                    city.address.state ? `${city.address.state}, ` : ``
                  } ${city.address.country}`
                );
              }}
            >
              {city.address.name},{" "}
              {city.address.state && `${city.address.state}, `}{" "}
              {city.address.country}
            </div>
          ))
        : null}
      {destSuggestions.length
        ? destSuggestions.map((city: SuggestionData) => (
            <div
              key={city.place_id}
              onClick={(e) => {
                e.preventDefault();
                setDestination(
                  `${city.address.name}, ${
                    city.address.state ? `${city.address.state}, ` : ``
                  } ${city.address.country}`
                );
                setDestSuggestions([]);
              }}
            >
              {city.address.name},{" "}
              {city.address.state && `${city.address.state}, `}{" "}
              {city.address.country}
            </div>
          ))
        : null}
    </div>
  );
};

export default SearchSuggestions;
