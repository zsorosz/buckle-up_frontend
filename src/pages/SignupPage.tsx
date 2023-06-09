import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";

const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
  const { userData, isAuthenticated } = useContext(SessionContext);

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      isAuthenticated && navigate("/");
    }
  }, [isAuthenticated, navigate, userData]);

  const handleSubmit = async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 201) {
      navigate("/login");
    }
  };
  return (
    <main className="auth-form-ctn">
      <AuthForm
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </main>
  );
};

export default SignupPage;
