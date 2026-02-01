import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Items } from "./Items.jsx";
import { ItemDetail } from "./ItemDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
