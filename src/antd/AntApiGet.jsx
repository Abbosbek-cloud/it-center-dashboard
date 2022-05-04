import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AntApiGet = ({ data, loading }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      render: (row) => row.address.city,
    },
    {
      title: "Batafsil",
      render: (row) => (
        <Link to={`/user/${row.id}`} className="btn btn-success">
          Batafsil
        </Link>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} loading={loading} />
    </>
  );
};

export default AntApiGet;
