import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import urlAxios from "../config/UrlAxios";
let socket;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [datosUser,setDataUser]=useState([])
  const [datos, setDatos] = useState([]);
  const [tarea_seleccionada, setTareaSeleecionada] = useState({});
  const [idUser, setIdUser] = useState("");
  const [loader,setLoader]=useState(true)

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  useEffect(() => {
    const autenticarUser = async () => {
      const token = localStorage.getItem("token-tareas");
      if (!token) {
        setLoader(false);
        return;
      }
      const confi = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { token },
      };
      try {
        const { data } = await urlAxios("/tareas/perfil", confi);
        setDataUser(data);
      } catch (error) {
        console.log(error);
        setDataUser({});
      }
      setLoader(false);
    };
    autenticarUser();
  }, []);

  const enviarDatos = async (dato) => {
    // console.log(dato);
    if (dato?.id) {
      try {
        await urlAxios.put("/tareas/actulizar-tarea", dato);
        console.log(dato);
        socket.emit("actualizar tarea", dato);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await urlAxios.post("/tareas/agregar-tarea", dato);
        console.log(data);
        socket.emit("nueva tarea", data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const agregarTareaSocket = (tarea) => {
    setDatos([...datos, tarea]);
    // localStorage.setItem("tareas_todo_list", JSON.stringify(tareas));
  };

  const actulizarTareas = (tarea) => {
    setTareaSeleecionada(tarea);
  };

  const actulizarTareaSocket = (tarea) => {
    console.log(tarea);
    const tareasActualizada = datos.map((item) =>
      item.id == tarea.id ? tarea : item
    );
    console.log(tareasActualizada);
    setDatos(tareasActualizada);
  };

  const eliminarTarea = async (tarea) => {
    try {
      await urlAxios.delete(`/tareas/eliminar/${tarea.id}`);
      // const tareaEliminada = datos.filter((tareas) => tareas.id !== tarea.id);
      socket.emit("eliminar tarea", tarea);
    } catch (error) {
      console.log(error);
    }
  };

  const tareaEliminada = (tarea) => {
    const tareasActulizadas = datos.filter((items) => items.id !== tarea.id);
    setDatos(tareasActulizadas);
    // localStorage.setItem("tareas_todo_list", JSON.stringify(tareasActulizadas));
  };

  const logout = async (datos) => {
    try {
      await urlAxios.post("/tareas/logout", datos);
      localStorage.removeItem("token-tareas")
      setDataUser([])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        datosUser,
        setDataUser,
        datos,
        setDatos,
        enviarDatos,
        agregarTareaSocket,
        actulizarTareaSocket,
        actulizarTareas,
        tarea_seleccionada,
        eliminarTarea,
        tareaEliminada,
        setIdUser,
        idUser,
        logout,
        loader,setLoader
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
