import { Route, Routes } from "react-router-dom";
import './styles/main.scss';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewTripForm from "./components/NewTripForm";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/trip-planner" element={<NewTripForm />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
