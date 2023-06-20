import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

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
    if (parsed.message) {
      setError(parsed.message)
    }
    else {
    setToken(parsed.token);
    setError("");
    navigate("/");
  }
  };

  return (
    <main className="auth-form-ctn">
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        isLogin
        handleSubmit={handleSubmit}
        error={error}
      />
    </main>
  );
};

export default LoginPage;
