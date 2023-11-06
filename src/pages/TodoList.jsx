import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import AppUse from "../hooks/AppUse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import urlAxios from "../config/UrlAxios";

let socket;

const mostrarAlerta = (texto) => {
  Swal.fire({
    icon: "error",
    width: 300,
    title: texto,
    timer: 1500,
    customClass: {
      title: "mi-clase",
    },
  });
};

const TodoList = () => {
  const params = useParams();
  const { idUser } = params;
  //   console.log(id)
  const [idUlr, setIdUrl] = useState(idUser);
  const {
    datosUser,
    enviarDatos,
    datos,
    setDatos,
    agregarTareaSocket,
    actulizarTareaSocket,
    actulizarTareas,
    tarea_seleccionada,
    eliminarTarea,
    tareaEliminada,
    logout,
  } = AppUse();
  const [tarea, setTarea] = useState("");
  const [importancia, setImportancia] = useState("baja");
  const [id, setId] = useState(null);

  useEffect(() => {
    const datosTareas = async () => {
      try {
        const { data } = await urlAxios(`/tareas/panel-tareas/${idUser}`);
        // console.log(data)
        setDatos(data);
      } catch (error) {
        console.log(error);
      }
    };
    datosTareas();
  }, []);

  useEffect(() => {
    if (tarea_seleccionada?.id) {
      setTarea(tarea_seleccionada.tarea);
      setImportancia(tarea_seleccionada.importancia);
      setId(tarea_seleccionada.id);
    }
  }, [tarea_seleccionada]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("inicio", idUser);
  }, []);

  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      console.log(tareaNueva);
      agregarTareaSocket(tareaNueva);
    });
    socket.on("tarea actualizada socket", (tareaActualizada) => {
      actulizarTareaSocket(tareaActualizada);
    });
    socket.on("tarea eliminada", (tarea_Eliminada) => {
      tareaEliminada(tarea_Eliminada);
    });
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    const campos = [tarea, importancia];
    if (
      campos.some((field) => typeof field !== "string" || field.trim() === "")
    ) {
      const campos_vacios = campos
        .filter((item) => typeof item === "string" && item.trim() === "")
        .join(",");
      mostrarAlerta(`Hay campos vacios`);
      return;
    }
    enviarDatos({ tarea, importancia, id, idUlr });
    setTarea("");
    setId(null);
    // setImportancia("");
  };

  return (
    <>
      <main className=" flex justify-center m-auto flex-col items-center">
        <h1 className=" m-2 text-xl">Administra tus tareas</h1>
        <div className=" w-11/12 flex justify-end m-2">
          <button
            className=" h-9 w-28 bg-blue-600 text-white rounded-lg"
            onClick={() => logout(datosUser)}
          >
            Logout
          </button>
        </div>
        <div className=" content m-2 flex items-center flex-wrap rounded-md bg-white">
          <form
            className=" flex justify-evenly w-full items-center"
            onSubmit={handelSubmit}
          >
            <div className=" flex justify-center gap-1 items-center flex-col md:flex-row">
              <label htmlFor="tarea">Tarea: </label>
              <input
                type="text"
                name="tarea"
                id="tarea"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                className=" rounded-sm outline outline-1 outline-slate-400  md:w-80 h-8"
              />
            </div>
            <div className=" flex justify-center gap-1 items-center flex-col md:flex-row">
              <label htmlFor="importancia">importancia: </label>
              <select
                name="importancia"
                id="importancia"
                className=" border-none outline-none"
                value={importancia}
                onChange={(e) => setImportancia(e.target.value)}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <input
              type="submit"
              className=" rounded-md bg-blue-600 text-white w-16 text-sm md:text-xl md:w-24 h-8 cursor-pointer"
              value={id ? "Actulizar" : "Agregar"}
            />
          </form>
        </div>
        <section className=" flex items-center flex-col m-2 width">
          {datos.length > 0 &&
            datos.map((item, i) => (
              <div
                className=" w-11/12 flex justify items-center rounded-md bg-white h-11 m-2"
                key={i}
              >
                <h1 className=" text-center">{item.tarea}</h1>
                <div className=" md:w-56 w-44 flex m-1 items-center justify-evenly">
                  <span className=" bg-lime-400 h-7 flex items-center justify-center rounded-lg w-12 text-center">
                    {item.importancia}
                  </span>
                  <button
                    className="bg-blue-600 rounded-lg h-6 md:h-7 md:w-20 text-sm md:text-lg text-white m-1"
                    onClick={() => actulizarTareas(item)}
                  >
                    Actulizar
                  </button>
                  <button
                    className="bg-rose-700 rounded-lg h-6 md:h-7 md:w-20 text-sm md:text-lg text-white m-1"
                    onClick={() => eliminarTarea(item)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </section>
      </main>
    </>
  );
};

export default TodoList;
