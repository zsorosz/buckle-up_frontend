import { useContext } from "react";
import NewTripForm from "../components/NewTripForm";
import TripDetails from "../components/TripDetails";
import PopularDestinations from "../components/PopularDestinations";
import { TripContext } from "../contexts/TripContext";
import EditTripForm from "../components/EditTripForm";

function HomePage(): JSX.Element {
  const { isTripShowing, isTripLoading, isEditing } = useContext(TripContext);
  return (
    <main className="home-ctn">
      <section className="home-main">
        <img className="home-img" src="/buckle_up-hero.jpg" />
        <div className="home-main_content">
          <h1>Let's plan your best trip ever!</h1>
          <h2>Create a road trip with route suggestions from Open AI</h2>
        </div>
        <NewTripForm />
      </section>
      {isTripLoading && (
        <div className="spinner-ctn">
          <img className="spinner" src="/destination.gif" />
        </div>
      )}
      {isEditing ? <EditTripForm /> : null}

      {isTripShowing && !isEditing ? <TripDetails /> : null}
      <PopularDestinations />
    </main>
  );
}

export default HomePage;
