import { useState, useEffect, useContext } from "react";
import { City } from "./Map";
import SearchSuggestions from "./SearchSuggestions";
import { TripContext } from "../contexts/TripContext";

export type Activities = {
  city: string;
  attractions: string[];
};

const NewTripForm = (): JSX.Element => {
  const [destination, setDestination] = useState("");
  const [startingCity, setStartingCity] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState([] as City[]);
  const [attractions, setAttractions] = useState([] as Activities[]);
  const [tripOption, setTripOption] = useState("oneway");

  const {
    setTripData,
    setIsTripLoading,
    isTripShowing,
    setIsTripShowing,
    totalDistance,
    totalTime,
  } = useContext(TripContext);

  const OPENAI_API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;

  const getAttractions = async (): Promise<void> => {
    const places: string[] = [];
    response.map((place: City) => {
      places.push(place.name);
    });
    const attractionsPrompt = `Give me a list of maximum 3 tourist attractions in each of these cities: ${places}. 
    Desired format: Cityname: attraction1, attraction2, attraction3; Cityname: attraction1, attraction2, attraction3...`;
    const APIBody = {
      model: "text-davinci-003",
      prompt: attractionsPrompt,
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
        const responseArr: string[] = data.choices[0].text.trim().split(";");
        const activitiesArr: Activities[] = [];
        responseArr.map((element) => {
          const splittedArr = element.split(":");
          const activities = {
            city: splittedArr[0],
            attractions: splittedArr[1].split(","),
          };
          activitiesArr.push(activities);
        });
        setAttractions(activitiesArr);
      });
  };
  const callOpenAIAPI = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const start = startingCity.substring(0, startingCity.indexOf(",")) +
    startingCity.substring(
      startingCity.lastIndexOf(","),
      startingCity.length
    )
    const end = destination.substring(0, destination.indexOf(",")) +
    destination.substring(
      destination.lastIndexOf(","),
      destination.length
    )
    const prompt =
      tripOption === "oneway"
        ? `List the cities of a recommended itinerary on a ${duration}-day road trip from ${start} to ${end}, with all together ${duration} stops. Do not add numbers before the city names and include the starting city and destination. Desired format:
      City name: latitude, longitude`
        : `Make a round trip between and list me the cities ${start} to ${end} , at least ${Math.round(
            duration / 2
          )} cities to visit on the way from ${start} to ${end}, and at least ${Math.round(
            duration / 2 
          )} different cities to visit on the way back.Try not to duplicate cities. Do not add numbers before the city names and include ${start} as the first and the last city on the list. 
          Desired format: City name: latitude(only number), longitude(only number)`;
    setIsTripLoading(true);
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

        const result: City[] = [];

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
        setIsTripShowing(true);
      });
  };

  useEffect(() => {
    if (attractions.length && response.length) {
      createTrip();
    }
  }, [attractions]);

  useEffect(() => {
    if (response.length) {
      getAttractions();
    }
  }, [response]);

  const createTrip = () => {
    const trip = {
      title: `${duration}-day road trip from ${startingCity.substring(
        0,
        startingCity.indexOf(",")
      )} to ${destination.substring(0, destination.indexOf(","))}`,
      startingCity:
        startingCity.substring(0, startingCity.indexOf(",")) +
        startingCity.substring(
          startingCity.lastIndexOf(","),
          startingCity.length
        ),
      destination:
        destination.substring(0, destination.indexOf(",")) +
        destination.substring(destination.lastIndexOf(","), destination.length),
      waypoints: response,
      attractions: attractions,
      totalDistance: totalDistance,
      totalTime: totalTime,
    };
    setTripData(trip);
    setIsTripLoading(false);
    setStartQuery("");
    setDestQuery("");
    setStartingCity("");
    setDestination("");
    setResponse([]);
    setTripOption("oneway");
  };
  return (
    <section className="form-ctn">
      {!isTripShowing && (
        <form className="trip-form" onSubmit={callOpenAIAPI}>
          <div className="trip-btn-ctn">
            <div>
              <input
                type="radio"
                id="one-way"
                name="trip-option"
                defaultChecked
                onClick={() => setTripOption("oneway")}
              />
              <label className="option-btn">One-way Trip</label>
            </div>
            <div>
              <input
                type="radio"
                id="round"
                name="trip-option"
                onClick={() => setTripOption("round")}
              />
              <label className="option-btn">Round Trip</label>
            </div>
          </div>
          <div className="form-input-ctn">
            <section>
              <p>From</p>
              <section className="input-container">
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
              </section>
            </section>
            <section>
              <p>To</p>
              <div className="input-container">
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
              </div>
            </section>
            <section>
              <p>Trip duration</p>
              <input
                type="number"
                min="1"
                defaultValue={1}
                onChange={(e) => setDuration(e.target.valueAsNumber)}
              />
            </section>
          </div>
          <button className="primary-btn" type="submit">
            Create a plan
          </button>
        </form>
      )}
    </section>
  );
};

export default NewTripForm;
