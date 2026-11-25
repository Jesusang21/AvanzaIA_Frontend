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

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Login },     // index: true → se muestra en "/"
      { path: "registerUser", Component: RegisterUser },
      { path: "homePage", Component: HomePage },
      { path: "*", Component: NoEncontrado },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
