import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";


const LoginPage = (): JSX.Element  => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
  const { setToken } = useContext(SessionContext);

  const handleSubmit = async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const parsed = await response.json();
    setToken(parsed.token); 
    navigate("/");
  };

  return (
    <div className="form-ctn">
    <h1>Login</h1>
    <AuthForm
      username={username}
      setUsername={setUsername} 
      password={password}
      setPassword={setPassword}
      isLogin
      handleSubmit={handleSubmit}
    />
  </div>
  )
}

export default LoginPage