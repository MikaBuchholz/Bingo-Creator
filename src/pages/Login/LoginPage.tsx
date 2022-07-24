import { LoginPageProps } from "../../interfaces/interfaces";
import { auth } from "../../firebase/FireBaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage(props: LoginPageProps) {
  const { user, setUser } = props;

  const provider = new GoogleAuthProvider();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  auth.onAuthStateChanged((user) => {
    console.log("change");
    if (user) {
      setUser(user);
      setLoggedIn(true);
    } else {
      setUser(null);

      setLoggedIn(false);
    }
  });

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        //setUser(user);

        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-wrapper">
      {!loggedIn ? (
        <>
          <p className="info-tag">It looks like you´re not logged in!</p>
          <button className="login-button" onClick={login}>
            LOGIN
          </button>
        </>
      ) : (
        <Navigate to="/create" />
      )}
    </div>
  );
}
