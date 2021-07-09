import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className='container'>
      <p>React curd operations</p>
      <Dashboard />
    </div>
  );
}

export default App;
