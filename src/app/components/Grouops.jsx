import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import Navbar from "./Navbar";

const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Grouops = () => {
  const [group, setGroup] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");

  const columns = [
    { title: "#", dataIndex: "id" },
    { title: "Group", dataIndex: "group" },
    { title: "O'quvchilar soni", dataIndex: "pupilCount" },
    { title: "O'qituvchi", dataIndex: "teacher" },
    {
      title: "Actions",
      render: (row) => (
        <div className="d-flex justify-content-between">
          <button onClick={() => editGroup(row)} className="btn btn-primary">
            <EditOutlined />
          </button>
          <button
            onClick={() => deleteGroup(row.id)}
            className="btn btn-danger"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];


  //worked
  const addGroup = () => {
    form.validateFields().then((values) => {
      setGroup([...group, values]);
      setIsModalVisible(false);
    });
  };

  //worked
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //worked
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  //worked
  const deleteGroup = (id) => {
    form.validateFields().then((values) => {
      const filtered = group.filter((item) => item.id !== id);
      setGroup([...filtered]);
    });
  };  

  //worked
  const editGroup = (group) => {
    setSelected(group);
    setIsModalVisible(true);
    form.setFieldsValue(group);
  };

  // ERROR
  const editGroupItem = (id) => {
    form.validateFields().then((values) => {
      const indexItem = group.filter((item) => item.id === values.id);

      const index = group.indexOf(indexItem);
      console.log(index);
      const oldItem = group[index];
      
      // only this side worked properly
      const newItem = {
        ...oldItem,
        id: values.id,
        group: values.group,
        pupilCount: values.pupilCount,
        teacher: values.teacher,
      };

      // console.log(newItem);

      const newArr = [
        ...group.slice(0, index),
        newItem,
        ...group.slice(index + 1),
      ];

      setGroup([...newArr]);
      setIsModalVisible(false);
    });
  };

  return (
    <Navbar>
      <Table
        columns={columns}
        dataSource={group}
        title={() => (
          <div className="d-flex justify-content-between align-items-center">
            <h3>Tutors</h3>
            <button onClick={showModal} className="btn btn-primary">
              Add
            </button>
          </div>
        )}
      />
      <Modal
        title="Basic modal"
        visible={isModalVisible}
        onOk={() => {
          selected ? editGroupItem() : addGroup;
        }}
        okText={selected ? "Saqlash" : "Qo'shish"}
        onCancel={handleCancel}
        cancelText="Bekor qilish"
      >
        <Form style={{ top: "100px !important" }} {...formLayout} form={form}>
          <Form.Item
            label="Id"
            name="id"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Id" />
          </Form.Item>
          <Form.Item
            label="group"
            name="group"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Full name" />
          </Form.Item>
          <Form.Item
            label="pupilCount"
            name="pupilCount"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Full name" />
          </Form.Item>
          <Form.Item
            label="teacher"
            name="teacher"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete={true} placeholder="teacher" />
          </Form.Item>
        </Form>
      </Modal>
    </Navbar>
  );
};

export default Grouops;
