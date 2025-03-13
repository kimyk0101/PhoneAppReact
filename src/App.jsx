import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhoneAppList from "../src/components/PhoneAppList";
import PhoneAppDetail from "../src/components/PhoneAppDetail";
// import PhoneAppEdit from "./PhoneAppEdit";
import PhoneAppAdd from "../src/components/PhoneAppAdd";

function App() {
  return (
    <>
      <h1>연락처</h1>
      <Router>
        <Routes>
          <Route path="/" element={<PhoneAppList />} />
          <Route path="/contact/:id" element={<PhoneAppDetail />} />
          {/* <Route path="/edit/:id" element={<PhoneAppEdit />} /> */}
          <Route path="/add" element={<PhoneAppAdd />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
