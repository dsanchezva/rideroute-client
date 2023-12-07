import { useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import IsPrivate from "./components/IsPrivate";
import Profile from "./pages/user/Profile";
import RoutesList from "./pages/motoRoute/RoutesList";
import RouteCreate from "./pages/motoRoute/RouteCreate";
import RouteDetails from "./pages/motoRoute/RouteDetails";
import RouteEdit from "./pages/motoRoute/RouteEdit";
import EditMotorbike from "./pages/user/userMotorbike/EditMotorbike";
import MainPage from "./pages/MainPage";
import UserEdit from "./pages/user/UserEdit";
import { ThemeContext } from "./context/theme.context";
import CommentEdit from "./pages/comment/CommentEdit";
import Footer from "./components/Footer";

function App() {
  const { selectedPageTheme } = useContext(ThemeContext);
  console.log(selectedPageTheme);
  return (
    <div className={selectedPageTheme}>
      <Navbar />
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* //Private routes */}
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path="/editUser"
          element={
            <IsPrivate>
              <UserEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/allRoutes"
          element={
            <IsPrivate>
              <RoutesList />
            </IsPrivate>
          }
        />
        <Route
          path="/routeCreate"
          element={
            <IsPrivate>
              <RouteCreate />
            </IsPrivate>
          }
        />
        <Route
          path="/routeDetails/:routeId"
          element={
            <IsPrivate>
              <RouteDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/routeEdit/:routeId"
          element={
            <IsPrivate>
              <RouteEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/editMoto"
          element={
            <IsPrivate>
              <EditMotorbike />
            </IsPrivate>
          }
        />
        <Route
          path="/home"
          element={
            <IsPrivate>
              <MainPage />
            </IsPrivate>
          }
        />
        {/* //MotoRoutes urls */}
        <Route
          path="/routeCreate"
          element={
            <IsPrivate>
              <MainPage />
            </IsPrivate>
          }
        />
        <Route
          path="/routeDetails/:routeId"
          element={
            <IsPrivate>
              <MainPage />
            </IsPrivate>
          }
        />
        <Route
          path="/routeEdit/:routeId"
          element={
            <IsPrivate>
              <MainPage />
            </IsPrivate>
          }
        />
        <Route
          path="/routeDetails/:routeId/comment/:commentId/edit"
          element={
            <IsPrivate>
              <CommentEdit />
            </IsPrivate>
          }
        />
        {/* //Error Routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
