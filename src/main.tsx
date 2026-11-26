import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import { NoEncontrado } from './pages/NoEncontrado.tsx';
import { RegisterUser } from './pages/RegisterUser.tsx';
import { Login } from './pages/Login.tsx';
import { HomePage } from './pages/Home.tsx';
import { ProtectedRoute } from './components/ProtegerRuta.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      // Rutas públicas
      { index: true, Component: Login },
      { path: "registerUser", Component: RegisterUser },

      // Rutas protegidas (todas las que pongas en children estarán protegidas)
      {
        Component: ProtectedRoute,
        children: [
          { path: "homePage", Component: HomePage },
          // Ejemplo de futuras páginas protegidas:
          // { path: "perfil", Component: PerfilPage },
          // { path: "configuracion", Component: ConfigPage },
        ],
      },

      // Ruta 404
      { path: "*", Component: NoEncontrado },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
