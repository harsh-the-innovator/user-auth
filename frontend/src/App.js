import React, { useState, useEffect } from "react";
import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./context/authContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState(() => {
    const jwt = localStorage.getItem("user-auth-jwt");
    if (jwt !== null) return jwt;
    else return null;
  });
  const [userId, setUserId] = useState(() => {
    const id = localStorage.getItem("user-auth-userId");
    if (id !== null) return id;
    else return null;
  });
  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("user-auth-jwt", token);
    localStorage.setItem("user-auth-userId", userId);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  };

  useEffect(() => {
    console.log(localStorage);
    const userAuthJwt = localStorage.getItem("user-auth-jwt");
    const userAuthUserId = localStorage.getItem("user-auth-userId");
    if (userAuthJwt !== null && userAuthUserId !== null) {
      setToken(userAuthJwt);
      setUserId(userAuthUserId);
    }
  }, []);

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{ token: token, userId: userId, login: login, logout: logout }}
        >
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            draggable
            pauseOnHover
          />
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {!token && <Route path="/login" component={LoginPage} />}
              {!token && <Route path="/signup" component={SignUpPage} exact />}
              {!token && <Redirect from="/" to="/login" />}
              {token && <Route path="/profile" component={ProfilePage} exact />}
              {token && <Redirect from="/" to="/profile" />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
