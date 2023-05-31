import { Route, Routes } from "react-router-dom";
import "./styles/main.scss";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyTrips from "./pages/MyTrips";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewTripForm from "./components/NewTripForm";
import { SessionContext } from "./contexts/SessionContext";
import { useContext } from "react";
import TripDetailsPage from "./pages/TripDetailsPage";

function App() {
  const { isAuthenticated } = useContext(SessionContext);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/trip-planner" element={<NewTripForm />} />
        <Route path="/:tripId" element={<TripDetailsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
