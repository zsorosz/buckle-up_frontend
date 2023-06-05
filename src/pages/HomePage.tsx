import NewTripForm from "../components/NewTripForm";

function HomePage(): JSX.Element {
  return (
    <main className="home-ctn">
      <section className="home-main">
        <img className="home-img" src="/public/buckle_up-hero.jpg" />
        <div className="home-main_content">
          <h1>Let's plan your best trip ever!</h1>
          <h2>Create a road trip with route suggestions from Open AI</h2>
        </div>
        <NewTripForm />
      </section>
    </main>
  );
}

export default HomePage;
