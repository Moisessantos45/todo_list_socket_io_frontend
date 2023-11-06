import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlAxios from "../config/UrlAxios";
import "../css/styleForm.css";
import AppUse from "../hooks/AppUse";

const FormLogin = () => {
  const { datosUser, setDataUser, loader, setLoader } = AppUse();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if ([password, email].includes("")) {
      return;
    }
    try {
      const { data } = await urlAxios.post("/tareas/login", {
        email,
        password,
      });
      console.log(data);
      setDataUser(data);
      localStorage.setItem("token-tareas", data.token);
      navigate(`/tareas/${data.id}`);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  useEffect(() => {
    if (datosUser?.id || localStorage.getItem("token-tareas")) {
      navigate(`/tareas/${datosUser.id}`);
    }
  }, []);
  if(loader) return "........"
  return (
    <>
      <main className=" w-full flex justify-center items-center">
        <div className="container-from">
          {/* {error && (
            <span className=" bg-red-600 flex w-11/12 items-center justify-center m-auto text-white font-bold text-sm rounded-md h-8">
              {error}
            </span>
          )} */}
          <div className="heading">Sign In</div>
          <form onSubmit={handelSubmit} className="form">
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className=" flex justify-evenly items-center w-11/12 m-1 h-7">
              {/* <span className="forgot-password">
                <Link to="#" className="text-base m-0 p-0">
                  Forgot Password ?
                </Link>
              </span> */}
              <Link to="/register" className=" text-blue-500 text-sm flex">
                Crear cuenta
              </Link>
            </div>

            <input
              className="login-button"
              type="submit"
              defaultValue="Sign In"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default FormLogin;
