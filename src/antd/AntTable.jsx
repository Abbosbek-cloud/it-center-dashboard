import { Button, Table } from "antd";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const AntTable = ({ tableData, editData }) => {
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Ism",
      dataIndex: "ism",
      key: "age",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "address",
    },
    {
      title: "Actions",
      render: (values) => (
        <div className="d-flex justify-content-around">
          <Button type="danger">
            <AiOutlineDelete />
          </Button>
          <Button onClick={() => editData(values)} type="primary">
            <FiEdit2 />
          </Button>
        </div>
      ),
    },
  ];
  return <Table dataSource={tableData} columns={columns} />;
};

export default AntTable;
