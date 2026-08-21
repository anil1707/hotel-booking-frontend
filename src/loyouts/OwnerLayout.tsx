import {
  Outlet,
  useNavigate,
} from "react-router-dom";



import "../styles/owner/owner-layout.css";
import OwnerSidebar from "../components/owner/OwnerSidebar";
import OwnerHeader from "../components/owner/OwnerHeader";

const OwnerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // We'll connect Redux logout here.
    navigate("/owner/login");
  };

  return (
    <div className="owner-layout">

      <OwnerSidebar
        onLogout={handleLogout}
      />

      <div className="owner-main">

        <OwnerHeader />

        <main className="owner-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default OwnerLayout;