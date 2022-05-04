import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./app/components/Dashboard";
import Grouops from "./app/components/Grouops";
import Navbar from "./app/components/Navbar";
import Students from "./app/components/Students";
import Tutors from "./app/components/Tutors";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/groups" element={<Grouops />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
