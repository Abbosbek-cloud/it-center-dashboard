import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "reactstrap";

const UserPage = ({ userData }) => {
  const { id } = useParams();

  const userInfo = userData.find((item) => {
    return item.id == id;
  });

  console.log(userInfo);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card mt-5 w-50">
        <div className="card-title text-center fs-2 mb-0">{userInfo.name}</div>
        <div className="card-body">
          <Table dark>
            <thead>
              <tr>
                <td>Info name</td>
                <td>Info text</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{userInfo.username}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{userInfo.phone}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <td>Сity</td>
                <td>{userInfo.address.city}</td>
              </tr>
              <tr>
                <td>Web-site</td>
                <td>{userInfo.website}</td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-end w-100">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
