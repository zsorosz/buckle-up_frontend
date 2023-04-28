import { useState } from "react";

const NewTripForm = (): JSX.Element => {
  const [destination, setDestination] = useState("");
  const [startingCity, setStartingCity] = useState("");
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState("");

  const API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;

  const callOpenAIAPI = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const APIBody = {
      model: "text-curie-001",
      prompt: `List the cities of a recommended itinerary on a ${duration}-day road trip from ${startingCity} to ${destination}.`,
      temperature: 0,
      max_tokens: 60,
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
        console.log(data);
        setResponse(data.choices[0].text.trim().split(","));
      });
  };

  return (
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
      {response !== "" ? <div>{response}</div> : null}
    </form>
  );
};

export default NewTripForm;
