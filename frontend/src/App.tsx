import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from 'react-router-dom';
import Requirements from "./pages/Requirements";
import Roster from "./pages/Roster";
import Schedules from "./pages/Schedules";
import Home from "./pages/Home";
function App() {
  
  

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/schedules" element={<Schedules />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
