import {
  Outlet,
} from "react-router-dom";
import Header from "../components/layouts/Header";


const MainLayout = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;