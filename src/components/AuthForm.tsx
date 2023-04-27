type AuthFormProps = {
  username: string;
  email: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
  isLogin?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  handleSubmit,
  isLogin = false,
}) => {
  const submitCallback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return <div>Form</div>;
};

export default AuthForm;
