import React, { useState } from "react";
import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./context/authContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
  };

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
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {token && <Redirect from="/" to="/profile" />}
              {!token && <Route path="/login" component={LoginPage} exact />}
              {!token && <Route path="/signup" component={SignUpPage} exact />}
              {token && <Route path="/profile" component={ProfilePage} exact />}
              {!token && <Redirect from="/" to="/login" />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
