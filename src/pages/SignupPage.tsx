import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";

const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isDemo = true;

  const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
  const { userData, isAuthenticated } = useContext(SessionContext);

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      isAuthenticated && navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const parsed = await response.json();
    if (response.status === 403) {
      setError(parsed.message);
    } else if (response.status === 201) {
      setError("");
      navigate("/login");
    }
  };
  return (
    <main className="auth-form-ctn">
      {isDemo ? (
        <div className="demo-note">This website is a demo page for portfolio purposes only and should not be used for real or sensitive personal information. For test account credentials, please contact the owner of the project.</div>
      ) : (
        <AuthForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}
    </main>
  );
};

export default SignupPage;
