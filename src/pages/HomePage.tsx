import { useContext } from "react";
import NewTripForm from "../components/NewTripForm";
import TripDetails from "../components/TripDetails";
import PopularDestinations from "../components/PopularDestinations";
import { TripContext } from "../contexts/TripContext";

function HomePage(): JSX.Element {
  const { isTripShowing } = useContext(TripContext);
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
      {isTripShowing ? <TripDetails /> : null}
      <PopularDestinations />
    </main>
  );
}

export default HomePage;
