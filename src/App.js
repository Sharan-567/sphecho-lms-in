import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profession from "./pages/Profession";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/profession" element={<Profession />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
