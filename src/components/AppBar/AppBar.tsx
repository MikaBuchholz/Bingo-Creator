import "./AppBar.css";
import { AppBarProps } from "../../interfaces/interfaces";
import { auth } from "../../firebase/FireBaseConfig";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppBar(props: AppBarProps) {
  const { user } = props;
  const navigator = useNavigate();

  const [activeUser, setActiveUser] = useState<any>(getAuth());

  return (
    <div>
      <header className="Navbar">
        <div className="Toolbar">
          <div className="Logo">
            {" "}
            <span role="img" aria-label="logo"></span>{" "}
          </div>
          <div className="Title"> Custom Bingo Creator </div>
          <div>
            <div className="route-wrapper">
              <button
                className="route-button"
                onClick={() => {
                  navigator("/create");
                }}
              >
                Create
              </button>
              <button
                className="route-button"
                onClick={() => {
                  navigator("/play");
                }}
              >
                Play
              </button>
              {activeUser ? (
                <button
                  className="logout-button"
                  onClick={() => {
                    auth.signOut();
                    navigator("/login");
                  }}
                >
                  {" "}
                  LOGOUT{" "}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <div className="Toolbar" />
    </div>
  );
}
