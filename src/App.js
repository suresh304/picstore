import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState } from "react";
import { authContext } from "./context/authContext";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "home",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <div>
      <authContext.Provider value={{ user, setUser }}>
        <Header/>
        <RouterProvider router={appRouter} />
      </authContext.Provider>
    </div>
  );
}

export default App;
