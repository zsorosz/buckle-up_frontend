import { useState } from "react";
import Map from "./Map";

const NewTripForm = (): JSX.Element => {
  const [destination, setDestination] = useState("");
  const [startingCity, setStartingCity] = useState("");
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState([]);

  const API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;
  const prompt = `List the cities of a recommended itinerary on a ${duration}-day road trip from ${startingCity} to ${destination}, with maximum ${
    duration + 2
  } stops.
  Desired format:
  City name: latitude, longitude`;

  const callOpenAIAPI = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        console.log(data.choices[0].text.trim().split("\n"));
        setResponse(data.choices[0].text.trim().split("\n"));
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
          onChange={(e) => setStartingCity(e.target.value)}
        />
        To:
        <input
          type="text"
          placeholder="Destination"
          onChange={(e) => setDestination(e.target.value)}
        />
        Trip duration:
        <input
          type="number"
          onChange={(e) => setDuration(e.target.valueAsNumber)}
        />
        <button type="submit">Create a plan</button>
      </form>
      {response.length ? <Map cities={response} /> : null}
    </div>
  );
};

export default NewTripForm;
