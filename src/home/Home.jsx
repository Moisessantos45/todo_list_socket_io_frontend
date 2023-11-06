import { useEffect, useState } from "react";
import AppUse from "../hooks/AppUse";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { Link, Navigate } from "react-router-dom";
import bg from "../img/home.png";
import taks from "../img/task.png"

const Home = () => {
  let id = uuidv4();
  const { datosUser, setIdUser, idUser } = AppUse();

  return (
    <>
      {datosUser?.id ? (
        <Navigate to={`/tareas/${datosUser.id}`} />
      ) : (
        <main
          className=" flex justify-center m-auto flex-col items-center heigth"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <img src={taks} alt="" className=" m-2 w-28" />
          <h1 className=" font-bold text-4xl m-2 text-white text-center">
            Agrega tus tareas y administralas
          </h1>
          <div className=" xl_w-6/12 justify-center flex gap-2 md:w-11/12">
            {" "}
            <Link
              className=" rounded-md h-9 w-36 bg-violet-950 flex justify-center items-center text-white font-bold"
              to="register"
            >
              Crea una cuenta
            </Link>
            <Link
              className=" rounded-md h-9 w-28 bg-violet-950 flex justify-center items-center text-white font-bold"
              to="login"
            >
              Inicia sesion
            </Link>{" "}
          </div>

          {/* <Link
      to={`tareas/${id}`}
      className=" rounded-md h-9 w-24 bg-blue-500 flex justify-center items-center text-white"
    >
      Empieza
    </Link> */}
        </main>
      )}
    </>
  );
};

export default Home;
