import { Navigate, Outlet } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import AppUse from "../hooks/AppUse";

const LayoutUser = () => {
  const { datosUser,loader } = AppUse();
  if(loader) return "......."
  return (
    <>
      {datosUser?.id ? (
        <>
          <NavbarUser />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LayoutUser;
