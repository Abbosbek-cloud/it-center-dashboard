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

const Group = () => {
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

  const addGroup = () => {
    form.validateFields().then((values) => {
      console.info(values);
      setGroup([...group, { id: group.length + 1, ...values }]);
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteGroup = (id) => {
    form.validateFields().then((values) => {
      const filtered = group.filter((item) => item.id !== id);
      setGroup([...filtered]);
    });
  };

  const editGroup = (group) => {
    setSelected(group);
    setIsModalVisible(true);
    form.setFieldsValue(group);
  };

  const editGroupItem = () => {
    form.validateFields().then((values) => {
      const newArr = group.filter((item) => item.id !== selected.id);
      setGroup([...newArr, { ...values, id: selected.id }]);
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
          selected ? editGroupItem() : addGroup();
        }}
        okText={selected ? "Saqlash" : "Qo'shish"}
        onCancel={handleCancel}
        cancelText="Bekor qilish"
      >
        <Form style={{ top: "100px !important" }} {...formLayout} form={form}>
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

export default Group;
