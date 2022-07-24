import React, { useState } from "react";
import "./App.css";
import CustomRouter from "./auth/router/CustomRouter";

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <CustomRouter user={user} setUser={setUser} />
    </>
  );
}

export default App;
