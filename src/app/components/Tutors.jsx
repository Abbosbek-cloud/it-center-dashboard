import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../constants/api";
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
  const [isModalVisible, setIsModalVisible] = useState(true);
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
          <button onClick={() => deleteTutor(row)} className="btn btn-danger">
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getTutors();
  }, []);

  const editTutor = (tutor) => {
    setSelected(tutor);
    setIsModalVisible(true);
    form.setFieldsValue(tutor);
  };

  const deleteTutor = (tutor) => {
    axios.delete(URL + "admin/tutor/delete" + tutor.id).then((res) => {
      getTutors();
      message.info("Tutor o'chirildi");
    });

    setTutor([...tutor.filter((item) => item.id !== tutor.id)]);
  };

  const getTutors = () => {
    axios.get(URL + "admin/tutors").then((res) => setTutor(res.data));
  };

  const addTutor = () => {
    form
      .validateFields()
      .then((values) => {
        delete values.confirm;
        setTutor([...tutor, values]);
        selected
          ? axios
              .put(URL + `admin/tutor/edit${selected.id}`, values)
              .then((res) => {
                setIsModalVisible(false);
                form.resetFields();
              })
              .catch((err) => {
                console.log(err);
              })
          : axios
              .post(URL + `admin/tutor/save`, values)
              .then((res) => {
                setIsModalVisible(false);
                form.resetFields();
              })
              .catch((err) => {
                console.log(err);
              });
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  console.log(tutor);

  const editTutorItem = () => {
    form.validateFields().then((values) => {
      const newTutors = tutor.map((item) => {
        if (item === values) {
          return { ...item, values };
        } else {
          return item;
        }
      });
      setTutor([...tutor, newTutors]);
    });
    setIsModalVisible(false);
    form.resetFields();
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
        onOk={selected ? editTutorItem : addTutor}
        okText={selected ? "Saqlash" : "Qo'shish"}
        onCancel={handleCancel}
        cancelText="Bekor qilish"
      >
        <Form {...formLayout} form={form}>
          <Form.Item
            label="Id"
            name="id"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Id" />
          </Form.Item>
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
