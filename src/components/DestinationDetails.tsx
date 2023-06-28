import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

type CityData = {
  name: string;
  description: string;
  image: string;
  _id: string;
};

function DestinationDetails(): JSX.Element {
  const [cityData, setCityData] = useState({} as CityData);
  const [isLoading, setIsLoading] = useState(true);

  const { city } = useParams<{ city: string }>();

  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const fetchCityData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/city/${city}`);
      setCityData(response.data.city as CityData);
      setIsLoading(false);
    } catch (error) {
      console.log("Could not fetch city data");
    }
  };

  useEffect(() => {
    fetchCityData();
  }, [cityData]);

  return (
    <main className="destination-ctn">
      {isLoading && null}
      <h2>{cityData.name}</h2>
      <img className="city-image" src={cityData.image} />
      <article className="city-description">{cityData.description}</article>
    </main>
  );
}

export default DestinationDetails;
