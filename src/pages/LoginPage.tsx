import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";

const LoginPage = (): JSX.Element => {
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
    <main className="auth-form-ctn">
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        isLogin
        handleSubmit={handleSubmit}
      />
    </main>
  );
};

export default LoginPage;
