import { useState } from "react";
import Map from "./Map";
import { City } from "./Map";
import SearchSuggestions from "./SearchSuggestions";
import TripDetails from "./TripDetails";

const NewTripForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [startingCity, setStartingCity] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState([] as object[]);

  const OPENAI_API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;
  const prompt = `List the cities of a recommended itinerary on a ${duration}-day road trip from ${startingCity} to ${destination}, with all together ${duration} stops. Do not add numbers before the city names and include the starting city and destination.
  Desired format:
  City name: latitude, longitude`;

  const callOpenAIAPI = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsLoading(true);
    event.preventDefault();
    const APIBody = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const cities = data.choices[0].text.trim().split("\n");

        const result: object[] = [];

        cities.map((city: string) => {
          const citiesArr = city.split(":");
          const coordinates: number[] = [];
          citiesArr[1]
            .split(",")
            .map((coord) => coordinates.push(Number(coord.replace(/\s/g, ""))));
          const waypoint = {
            name: citiesArr[0],
            coord: coordinates,
          };
          result.push(waypoint);
        });
        setResponse(result);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>New road trip</h2>
      <form className="trip-form" onSubmit={callOpenAIAPI}>
        From:
        <input
          type="text"
          placeholder="Starting City"
          value={startingCity}
          onChange={(e) => {
            setStartingCity(e.target.value);
            setStartQuery(e.target.value);
          }}
        />
        {startQuery.length ? (
          <SearchSuggestions
            query={startQuery}
            waypoint="start"
            setStartingCity={setStartingCity}
            setDestination={setDestination}
          />
        ) : null}
        To:
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestQuery(e.target.value);
          }}
        />
        {destQuery.length ? (
          <SearchSuggestions
            query={destQuery}
            waypoint="end"
            setStartingCity={setStartingCity}
            setDestination={setDestination}
          />
        ) : null}
        Trip duration:
        <input
          type="number"
          onChange={(e) => setDuration(e.target.valueAsNumber)}
        />
        <button className="primary-btn" type="submit">
          Create a plan
        </button>
      </form>
      {isLoading && (
        <img src="../../public/destination.gif" style={{ width: "150px" }} />
      )}

      {!isLoading && response.length ? (
        <TripDetails cities={response as City[]} />
      ) : null}
    </div>
  );
};

export default NewTripForm;
