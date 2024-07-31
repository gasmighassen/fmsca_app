import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import DataTable from "./Components/DataTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<DataTable />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
