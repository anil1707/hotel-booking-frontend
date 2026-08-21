import { useAppSelector } from "../../store/hooks";

const OwnerHeader = () => {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  return (
    <header className="owner-header">

      <div>
        <h1>Owner Dashboard</h1>
      </div>

      <div className="owner-header-user">
        Hi, {user?.name}
      </div>

    </header>
  );
};

export default OwnerHeader;