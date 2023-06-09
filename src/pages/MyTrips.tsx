import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { UserData } from "../types";
import axios from "axios";

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
              <a href={`/${trip._id}`} className="card">
                <img
                  src={`https://source.unsplash.com/600x300/?${trip.destination}`}
                  alt="destination photo"
                />
                <div className="card-details">
                  <h2 className="card-title">{trip.title}</h2>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default MyTrips;
