import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState } from "react";
import { authContext } from "./context/authContext";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import Mystory from "./components/Mystory";
import { useSelector } from "react-redux";

function App() {
  const user_rdx = JSON.parse(useSelector((state) => state.user))
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: !user_rdx?<Login/>:<Navigate to="/home"/>,
    },
    
    {
      path: "home",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "Mystory",
      element: (
        <PrivateRoute>
          <Mystory />
         </PrivateRoute>
      ),
    },
  ]);
  return (
    <div>
      
        <Header/>
        <RouterProvider router={appRouter} />
      
    </div>
  );
}

export default App;

// suresh@gmail.com
// Suresh143@
