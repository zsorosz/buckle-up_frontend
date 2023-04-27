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
  const submitCallback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div>
      <form onSubmit={submitCallback}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
            />
          </label>
        </div>
        {isLogin ? (
          ""
        ) : (
          <div>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail && setEmail(event.target.value)}
                placeholder="Enter email"
              />
            </label>
          </div>
        )}
        <div>
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </label>
        </div>
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
