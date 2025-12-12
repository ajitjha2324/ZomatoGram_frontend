import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import ChooseRegister from "../pages/auth/ChooseRegister";
import UserLogin from "../pages/auth/userLogin2";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import BottomNav from "../components/BottomNav";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has a valid session (cookie-based)
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });
        setIsAuth(response.ok);
      } catch {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        {/* Root route: redirect to /home if auth, else to register */}
        <Route
          path="/"
          element={
            isLoading ? (
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  height: "100vh",
                  color: "#fff",
                }}
              >
                Loading...
              </div>
            ) : isAuth ? (
              <>
                <Home />
                <BottomNav />
              </>
            ) : (
              <UserRegister />
            )
          }
        />

        {/* Primary app feed moved to /home (BottomNav links updated) */}
        <Route
          path="/home"
          element={
            <>
              <Home />
              <BottomNav />
            </>
          }
        />
        <Route
          path="/saved"
          element={
            <>
              <Saved />
              <BottomNav />
            </>
          }
        />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
