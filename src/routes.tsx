import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import CreateAluno from "./Pages/CreateAluno";
import RemoveAluno from "./Pages/RemoveAluno";
import UpdateAluno from "./Pages/UpdateAluno";
import CreateProfessor from "./Pages/CreateProfessor";
import RemoveProfessor from "./Pages/RemoveProfessor";
import CreateAvaliacao from "./Pages/CreateAvaliacao";
import CreateUC from "./Pages/CreateUC";
import RemoveUC from "./Pages/RemoveUC";
import UpdateUC from "./Pages/UpdateUC";
import CreateCurso from "./Pages/CreateCurso";
import RemoveCurso from "./Pages/RemoveCurso";
import UpdateCurso from "./Pages/UpdateCurso";
import ListAluno from "./Pages/ListAlunos";
import ListAvaliacao from "./Pages/ListAvaliacoes";
import ListCurso from "./Pages/ListCursos";
import ListProfessor from "./Pages/ListProfessor";
import ListUC from "./Pages/ListUC";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />
    },
    
    {
        path: "/Login",
        element: <Login />
    },

    {
        path: "/Logout",
        element: <Logout />
    },

    {
        path: "/CreateAluno",
        element: <CreateAluno />
    },

    {
        path: "/RemoveAluno",
        element: <RemoveAluno />
    },

    {
        path: "/UpdateAluno",
        element: <UpdateAluno />
    },

    {
        path: "/CreateProfessor",
        element: <CreateProfessor />
    },

    {
        path: "/RemoveProfessor",
        element: <RemoveProfessor />
    },

    {
        path: "/CreateAvaliacao",
        element: <CreateAvaliacao />
    },

    {
        path: "/CreateUC",
        element: <CreateUC />
    },

    {
        path: "/RemoveUC",
        element: <RemoveUC />
    },

    {
        path: "/UpdateUC",
        element: <UpdateUC />
    },

    {
        path: "/CreateCurso",
        element: <CreateCurso />
    },

    {
        path: "/RemoveCurso",
        element: <RemoveCurso />
    },

    {
        path: "/UpdateCurso",
        element: <UpdateCurso />
    },

    {
        path: "/ListAlunos",
        element: <ListAluno />
    },

    {
        path: "/ListAvailacoes",
        element: <ListAvaliacao />
    },

    {
        path: "/ListCursos",
        element: <ListCurso />
    },

    {
        path: "/ListProfessor",
        element: <ListProfessor />
    },

    {
        path: "/ListUC",
        element: <ListUC />
    },
]);