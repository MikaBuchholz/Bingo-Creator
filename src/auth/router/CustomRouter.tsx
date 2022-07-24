import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LoginPage from "../../pages/Login/LoginPage";
import PlayPage from "../../pages/Play/PlayPage";
import CreatePage from "../../pages/Create/CreatePage";
import { RouterProps } from "../../interfaces/interfaces";
import AppBar from "../../components/AppBar/AppBar";
import SharePage from "../../pages/Share/SharePage";

export default function CustomRouter(props: RouterProps) {
  const { user, setUser } = props;

  return (
    <Router>
      <AppBar user={user} />
      <div>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage user={user} setUser={setUser} />}
          ></Route>
          <Route path="/play/:id" element={<PlayPage user={user} />}></Route>
          <Route path="/play" element={<PlayPage user={user} />}></Route>
          <Route path="/share/:id" element={<SharePage />}></Route>
          <Route
            path="/"
            element={<LoginPage user={user} setUser={setUser} />}
          ></Route>
          <Route path="/create" element={<CreatePage user={user} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
