import SearchForm from "../../components/hotel/searchForm";


const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Find your perfect stay
          </h1>

          <p>
            Search hotels, resorts and
            comfortable stays at the best
            locations.
          </p>

          <SearchForm />
        </div>
      </section>
    </div>
  );
};

export default HomePage;