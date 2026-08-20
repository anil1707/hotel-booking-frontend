import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Toast from "../components/common/toast/Toast";

const MainLayout = () => {
  return (
    <div className="app">
      <Header />

      <main className="main-content-container">
        <div className="main-content">
          <Outlet />
        </div>
      </main>

      <Footer />

      <Toast />
    </div>
  );
};

export default MainLayout;