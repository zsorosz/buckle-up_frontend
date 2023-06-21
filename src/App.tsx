import { Route, Routes } from "react-router-dom";
import "./styles/main.scss";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyTrips from "./pages/MyTrips";
import Footer from "./components/Footer";
import NewTripForm from "./components/NewTripForm";
import TripDetailsPage from "./pages/TripDetailsPage";
import Header from "./components/Header";
import EditTripForm from "./components/EditTripForm";
import DestinationDetails from "./components/DestinationDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/trip-planner" element={<NewTripForm />} />
        <Route path="/:tripId" element={<TripDetailsPage />} />
        <Route path="/:tripId/edit" element={<EditTripForm />} />
        <Route path="/destination/:city" element={<DestinationDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
