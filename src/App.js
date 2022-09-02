import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profession from "./pages/Profession";
import Curriculum from "./pages/Curriculum/Curriculum";
import ResourceHub from "./pages/ResourceHub";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/profession" element={<Profession />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/resourcehub" element={<ResourceHub />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
