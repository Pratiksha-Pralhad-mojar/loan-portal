import React from "react";
import Apply from "./pages/Apply";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Loan Portal
      </h1>

      <Apply />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;