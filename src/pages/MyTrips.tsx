import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { UserData } from "../types";
import axios from "axios";
import Card from "../components/Card";

function MyTrips(): JSX.Element {
  const { userData } = useContext(SessionContext);

  const [user, setUser] = useState({} as UserData);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

  const fetchUserData = async () => {
    if (userData) {
      const response = await axios.get(`${BASE_URL}/auth/${userData?._id}`);
      setUser(response.data.user);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <main className="home-ctn mytrips-ctn">
      {isLoading && user ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="mytrips-title">My Trips</h2>
          <div className="cards-container">
            {user.trips?.map((trip) => (
              <Card
                city={trip.destination}
                title={trip.title}
                link={`/${trip._id}`}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default MyTrips;
