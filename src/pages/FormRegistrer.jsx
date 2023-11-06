import { useState } from "react";
import urlAxios from "../config/UrlAxios";
import { Link, useNavigate } from "react-router-dom";
import AppUse from "../hooks/AppUse";

const FormRegistrer = () => {
  const {setLoader}=AppUse()
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if ([password, email].includes("")) {
      return;
    }
    try {
      await urlAxios.post("/tareas/registrer", {
        email,
        password,
        nombre
      });
      // navigate(`/tareas/login`);
      setLoader(false)
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className=" w-full flex justify-center items-center">
        <div className="container-from">
          <div className="heading">Create cuenta</div>
          <form
            onSubmit={handelSubmit}
            className="form justify-center items-center flex flex-wrap"
          >
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
              type="text"
              name="text"
              id="text"
              value={nombre}
              placeholder="Nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="input m-2"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className=" flex justify-evenly items-center w-11/12 m-1 h-7">
              <Link to="/login" className=" text-blue-500 text-sm flex">
                Login
              </Link>
            </div>
            <button
              className=" h-10 bg-blue-600 rounded-md w-32 text-white font-bold flex justify-center items-center m-2"
              type="submit"
            >
              Create cuenta
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default FormRegistrer;
