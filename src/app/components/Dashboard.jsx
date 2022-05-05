import React from "react";
import Navbar from "./Navbar";
import Person from "./images/person.png";

const Dashboard = () => {
  return (
    <Navbar>
      <div className="d-flex justify-content-between align-items-center">
        <div className="admin d-flex align-items-center">
          <img
            src={Person}
            alt=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <h3 className="mb-0">Admin</h3>
        </div>
        <div className="btn-group">
          <button className="btn btn-success">Add course</button>
          <button className="btn btn-danger">Remove course</button>
        </div>
      </div>
    </Navbar>
  );
};

export default Dashboard;
