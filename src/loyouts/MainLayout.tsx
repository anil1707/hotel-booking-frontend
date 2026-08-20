import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const MainLayout = () => {
  return (
    <div className="app">
      <Header />

      <main className="main-content-container">
        <div style={{width:"80vw"}}>
        <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;