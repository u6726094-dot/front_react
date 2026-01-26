import { Routes, Route } from "react-router-dom";
import TestAPI from "./TestAPI";

function App() {
  return (
    <Routes>
      <Route path="/test_api" element={<TestAPI />} />

    </Routes>
  );
}

export default App;
