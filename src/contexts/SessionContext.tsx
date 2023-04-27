/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  username: string;
}

interface SessionContextState {
  setToken: (token: string | null) => void;
  token: string | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  userData: UserData | null | undefined;
  setUserData: (data: UserData | null) => void;
  verifyToken: (jwt: string | null | undefined) => Promise<void>;
  handleLogout: () => void;
  refreshData: (updatedUser: UserData) => void;
}

export const SessionContext = createContext<SessionContextState>({
  setToken: () => {},
  token: null,
  isAuthenticated: false,
  isLoading: true,
  userData: undefined,
  setUserData: () => {},
  verifyToken: async () => {},
  handleLogout: () => {},
  refreshData: () => {},
});

const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null | undefined>();
  const [userData, setUserData] = useState<UserData | null | undefined>();

  const navigate = useNavigate();

  const BASE_URL: string = import.meta.env.VITE_BASE_URL;

  const verifyToken = async (jwt: string | undefined | null) => {
    try {
      const fetchData = await fetch(`${BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data: UserData = await fetchData.json();
      if (data?.username) {
        setUserData(data);
        setToken(jwt);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUserData(null);
        setIsAuthenticated(false);
        setToken(null);
        navigate("/");
        console.log("userData not found");
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    verifyToken(localToken);
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      verifyToken(token);
    }
  }, [token]);

  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    setIsLoading(false);
    setUserData(null);
    setIsAuthenticated(false);
    setToken(null);
    navigate("/");
  };

  const refreshData = (updatedUser: UserData) => {
    setUserData(updatedUser);
  };

  return (
    <SessionContext.Provider
      value={{
        setToken,
        token,
        isAuthenticated,
        isLoading,
        userData,
        setUserData,
        verifyToken,
        handleLogout,
        refreshData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
