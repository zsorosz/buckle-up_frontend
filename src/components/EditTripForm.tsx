import { useContext, useEffect, useState } from "react";
import { City } from "./Map";
import Map from "./Map";
import { useParams } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";
import { Activities } from "./NewTripForm";

import axios from "axios";
import WaypointInput from "./WaypointInput";

function EditTripForm(): JSX.Element {
  const [waypoints, setWaypoints] = useState([] as City[]);
  const [seed, setSeed] = useState(1);
  const [attractions, setAttractions] = useState([] as Activities[]);

  const {
    tripData,
    setTripData,
    totalDistance,
    setTotalDistance,
    totalTime,
    setTotalTime,
    updateTrip,
    saveTrip,
  } = useContext(TripContext);

  const { tripId } = useParams();
  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
  const OPENAI_API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;

  const getTripDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trip/${tripId}`);
      setTripData(response.data.trip);
    } catch (error) {
      console.log("Could not fetch trip details");
    }
  };

  const getAttractions = async (): Promise<void> => {
    const places: string[] = [];
    waypoints.map((place: City) => {
      places.push(place.name);
    });
    const attractionsPrompt = `Give me a list of maximum 3 tourist attractions in each of these cities: ${places}. 
    Desired format: Cityname: attraction1, attraction2, attraction3; Cityname: attraction1, attraction2, attraction3...`;
    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": attractionsPrompt
        }],
      temperature: 0,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
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
        const responseArr: string[] = data.choices[0].message.content.trim().split(";");
        const activitiesArr: Activities[] = [];
        responseArr.map((element) => {
          const splittedArr = element.split(":");
          const activities = {
            city: splittedArr[0],
            attractions: splittedArr[1].split(","),
          };
          activitiesArr.push(activities);
        });
        if (places[0] === places[places.length - 1]) {
          const finalStop = {
            city: places[0],
            attractions: [],
          };
          activitiesArr.push(finalStop);
        }
        setAttractions(activitiesArr);
      });
  };

  const saveUpdates = async () => {
    if (tripData) {
      const updatedTrip = {
        _id: tripData._id,
        title: tripData.title,
        startingCity: waypoints[0].name,
        destination: waypoints[waypoints.length - 1].name,
        waypoints: waypoints,
        attractions: attractions,
        totalDistance: totalDistance,
        totalTime: totalTime,
      };
      setTripData(updatedTrip);
      if (tripData._id === undefined) {
        saveTrip(updatedTrip);
      }
      updateTrip(updatedTrip);
    }
  };
  useEffect(() => {
    getTripDetails();
  }, []);

  useEffect(() => {
    if (attractions.length) {
      saveUpdates();
    }
  }, [attractions]);

  useEffect(() => {
    if (tripData) {
      const waypointArr: City[] = [];
      tripData.waypoints.map((waypoint) => {
        waypointArr.push(waypoint);
      });
      setWaypoints(waypointArr);
    }
  }, [tripData]);

  return (
    <>
      {tripData ? (
        <div className="edit-trip-ctn">
          <section className="edit-waypoints-input-ctn">
            {waypoints.map((city: City, index: number) => (
              <WaypointInput
                key={city.name}
                city={city.name}
                index={index}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
                setSeed={setSeed}
              />
            ))}
            <button
              onClick={getAttractions}
              className="primary-btn update-trip-btn"
            >
              Save
            </button>
          </section>
          <section className="trip-map edit-trip-map">
            <Map
              key={seed}
              cities={waypoints as City[]}
              setTotalDistance={setTotalDistance}
              setTotalTime={setTotalTime}
            />
          </section>
          <div className="trip-data edit-trip-data">
            <div>
              <h5>Total Distance:</h5>{" "}
              {totalDistance &&
                Math.round((totalDistance + Number.EPSILON) * 100) / 100}{" "}
              km
            </div>
            <div>
              <h5>Total Driving Time:</h5>
              {totalTime && Math.floor(totalTime / 3600)} h{" "}
              {totalTime && Math.round((totalTime / 60) % 60)} min
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditTripForm;
