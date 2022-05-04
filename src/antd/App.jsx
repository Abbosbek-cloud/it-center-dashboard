import { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AntApiGet from "./antd/AntApiGet";
import UserPage from "./antd/UserPage";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<AntApiGet data={data} />} />
          <Route
            exact
            path="/user/:id"
            element={<UserPage userData={data} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
