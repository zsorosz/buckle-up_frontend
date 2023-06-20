import { useNavigate } from "react-router-dom";
type AuthFormProps = {
  username: string;
  email?: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
  isLogin?: boolean;
};

const AuthForm = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  handleSubmit,
  isLogin = false,
}: AuthFormProps): JSX.Element => {
  const navigate = useNavigate();
  const submitCallback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={submitCallback} className="auth-form">
      <h2 className="title">{isLogin ? "Welcome back!" : "Welcome!"}</h2>
      <h6 className="subtitle">
        {isLogin ? "" : "Let's create your account!"}{" "}
      </h6>
      <div className="auth-ctn">
        <input
          className="input-ctn"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
        />
      </div>
      {isLogin ? (
        ""
      ) : (
        <div className="auth-ctn">
          <input
            className="input-ctn"
            type="text"
            value={email}
            onChange={(event) => setEmail && setEmail(event.target.value)}
            placeholder="Email"
            required
          />
        </div>
      )}
      <div className="auth-ctn">
        <input
          className="input-ctn"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className="primary-btn">
        {isLogin ? "Log In" : "Sign Up"}
      </button>
      {isLogin ? (
        <div className="auth-redirect">
          <p>Don't have an account yet?</p>
          <button className="outline-btn" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      ) : (
        <div className="auth-redirect">
          <p>Already signed up?</p>
          <button className="outline-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
