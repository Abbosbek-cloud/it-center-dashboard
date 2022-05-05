import { Avatar, Card, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Person from "./images/person.png";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Students = () => {
  const [pupils, setPupils] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [form] = Form.useForm();

  const { Meta } = Card;

  const addStudent = () => {
    form.validateFields().then((values) => {
      setPupils([...pupils, { ...values, id: uuidv4().match(/(\d+)/) }]);
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editPupilInfo = (pupilInfo) => {
    setSelected(pupilInfo);
    setIsModalVisible(true);
    form.setFieldsValue(pupilInfo);
  };

  const editPupilData = () => {
    form.validateFields().then((values) => {
      const newData = pupils.filter((item) => item.id !== selected.id);
      setPupils([...newData, { ...values, id: selected.id }]);
      setIsModalVisible(false);
      form.resetFields();
      setSelected("");
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deletePupilInfo = (id) => {
    form.validateFields().then((values) => {
      const deletedArr = pupils.filter((item) => item.id !== id);
      setPupils([...deletedArr]);
    });
  };

  return (
    <Navbar>
      <div className="d-flex justify-content-between">
        <h3>Students</h3>
        <button onClick={showModal} className="btn btn-primary">
          Add student
        </button>
      </div>
      <div className="container pupil-cont">
        <Row justify="space-around w-100">
          {pupils.map((pupil) => (
            <Col
              key={pupil.id}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              xs={{ span: 24 }}
              sm={{ span: 11 }}
              md={{ span: 7 }}
              xxl={{ span: 8 }}
            >
              <Card
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined
                    onClick={() => editPupilInfo(pupil)}
                    key="edit"
                  />,
                  <DeleteOutlined
                    onClick={() => {
                      deletePupilInfo(pupil.id);
                    }}
                    key="ellipsis"
                  />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={Person} />}
                  title={pupil.fullname}
                  description={
                    <div>
                      <p className="mb-0">Email: {pupil.email}</p>
                      <p className="mb-0">Course: {pupil.kursi}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="Basic modal"
        visible={isModalVisible}
        onOk={() => {
          selected ? editPupilData() : addStudent();
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
            label="Email"
            name="email"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Email kiriting..." />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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
            label="Kursi"
            name="kursi"
            rules={[{ required: true, message: "To'ldirilmagan" }]}
          >
            <Input autoComplete="true" placeholder="Kursi" />
          </Form.Item>
        </Form>
      </Modal>
    </Navbar>
  );
};

export default Students;
