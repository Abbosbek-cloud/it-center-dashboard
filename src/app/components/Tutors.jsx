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

const Tutors = () => {
  const [tutor, setTutor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");

  const columns = [
    { title: "#", dataIndex: "id" },
    { title: "Fullname", dataIndex: "fullname" },
    { title: "Username", dataIndex: "username" },
    { title: "Address", dataIndex: "address" },

    {
      title: "Actions",
      render: (row) => (
        <div className="d-flex justify-content-between">
          <button onClick={() => editTutor(row)} className="btn btn-primary">
            <EditOutlined />
          </button>
          <button
            onClick={() => deleteTutor(row.id)}
            className="btn btn-danger"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const addTutor = () => {
    form.validateFields().then((values) => {
      setTutor([...tutor, { ...values, id: tutor.length + 1 }]);
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteTutor = (id) => {
    form.validateFields().then((values) => {
      const filtered = tutor.filter((item) => item.id !== id);
      setTutor([...filtered]);
    });
  };

  const editTutor = (tutor) => {
    setSelected(tutor);
    setIsModalVisible(true);
    form.setFieldsValue(tutor);
  };

  const editTutorItem = (id) => {
    form.validateFields().then((values) => {
      const newArr = tutor.filter((item) => item.id !== selected.id);
      setTutor([...newArr, { ...values, id: selected.id }]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <Navbar>
      <Table
        columns={columns}
        dataSource={tutor}
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
          selected ? editTutorItem() : addTutor();
        }}
        okText={selected ? "Saqlash" : "Qo'shish"}
        onCancel={handleCancel}
        cancelText="Bekor qilish"
      >
        <Form {...formLayout} form={form}>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Full name" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Full name" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete={true} placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="true" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Dastlabki parol bilan bir xil emas!")
                  );
                },
              }),
            ]}
          >
            <Input.Password autoComplete="true" />
          </Form.Item>
        </Form>
      </Modal>
    </Navbar>
  );
};

export default Tutors;
