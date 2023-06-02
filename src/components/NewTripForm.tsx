import { useState, useEffect, useContext } from "react";
import { City } from "./Map";
import SearchSuggestions from "./SearchSuggestions";
import TripDetails from "./TripDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

export type Activities = {
  city: string;
  attractions: string[];
};

const NewTripForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTripShowing, setIsTripShowing] = useState(false);
  const [destination, setDestination] = useState("");
  const [startingCity, setStartingCity] = useState("");
  const [startQuery, setStartQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState([] as City[]);
  const [attractions, setAttractions] = useState([] as Activities[]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();

  const { userData, refreshData } = useContext(SessionContext);

  const OPENAI_API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const getAttractions = async (): Promise<void> => {
    const places: string[] = [];
    response.map((place: City) => {
      places.push(place.name);
    });
    console.log(places);
    const attractionsPrompt = `Give me a list of maximum 3 tourist attractions in each of these cities: ${places}. 
    Desired format: Cityname: attraction1, attraction2, attraction3; Cityname: attraction1, attraction2, attraction3...`;
    console.log(attractionsPrompt);
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
        setIsLoading(false);
      });
  };
  const callOpenAIAPI = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const prompt = `List the cities of a recommended itinerary on a ${duration}-day road trip from ${startingCity} to ${destination}, with all together ${duration} stops. Do not add numbers before the city names and include the starting city and destination.
  Desired format:
  City name: latitude, longitude`;
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

  const resetTrip = () => {
    setIsTripShowing(false);
    setStartQuery("");
    setDestQuery("");
    setStartingCity("");
    setDestination("");
    setResponse([]);
  };
  useEffect(() => {
    if (response.length) {
      getAttractions();
    }
  }, [response]);

  const saveTrip = async () => {
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
    const res = await axios.post(`${BASE_URL}/trip/add`, {
      trip,
      userData,
    });
    refreshData(res.data.updatedUser);
    console.log(res.data.updatedUser);
    navigate("/");
  };

  return (
    <section className="form-ctn">
      {/* <h1>
        {!isTripShowing
          ? "New road trip"
          : `${duration}-day road trip from ${startingCity.substring(
            0,
            startingCity.indexOf(",")
            )} to ${destination.substring(0, destination.indexOf(","))}`}
          </h1> */}
      {!isTripShowing ? (
        <form className="trip-form" onSubmit={callOpenAIAPI}>
          <div className="btn-ctn">
            <div>
              <input type="radio" id="one-way" name="trip-option" checked />
              <label className="option-btn">One-way Trip</label>
            </div>
            <div>
              <input type="radio" id="round" name="trip-option" />
              <label className="option-btn">Round Trip</label>
            </div>
          </div>
          <div className="form-input-ctn">
            <p>From</p>
            <div className="input-container">
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
            </div>
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
            <p>Trip duration</p>
            <input
              type="number"
              min="1"
              defaultValue={1}
              onChange={(e) => setDuration(e.target.valueAsNumber)}
            />
          </div>
          <button className="primary-btn" type="submit">
            Create a plan
          </button>
        </form>
      ) : (
        <div className="trip-ctas">
          <button className="primary-btn" onClick={saveTrip}>
            Save trip
          </button>
          <button className="secondary-btn" onClick={resetTrip}>
            Create new trip
          </button>
        </div>
      )}
      {isLoading && <img src="/destination.gif" style={{ width: "150px" }} />}

      {!isLoading && response.length && attractions.length ? (
        <TripDetails
          cities={response as City[]}
          attractions={attractions as Activities[]}
          setTotalDistance={setTotalDistance}
          setTotalTime={setTotalTime}
          totalDistance={totalDistance}
          totalTime={totalTime}
        />
      ) : null}
    </section>
  );
};

export default NewTripForm;
