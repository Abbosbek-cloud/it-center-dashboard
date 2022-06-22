import { EllipsisOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Space,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../adminPanel/api";
import { user_token } from "./userApi";

const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getUser();
  }, []);

  const tokenOfUser = localStorage.getItem("Token");

  const navigate = useNavigate();

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const getUser = () => {
    axios({
      url: `${BASE_URL}user/getProfile`,
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenOfUser}`,
      },
    }).then((res) => {
      setUserData(res.data.data);
    });
  };

  const editUser = () => {
    setIsModalVisible(true);
  };

  const deleteUser = () => {
    axios({
      url: `${BASE_URL}user/delete`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${tokenOfUser}`,
      },
    }).then((res) => {
      localStorage.clear();
      navigate("/");
    });
  };

  const exit = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      axios({
        url: `${BASE_URL}user/update`,
        method: "put",
        headers: {
          Authorization: `Bearer ${tokenOfUser}`,
        },
        data: values,
      }).then((res) => {
        getUser();
        setIsModalVisible(false);
      });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="edit">
        <Button style={{ width: "100%" }} onClick={editUser}>
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item key="delete">
        <Button style={{ width: "100%" }} type="ghost" onClick={deleteUser}>
          Delete
        </Button>
      </Menu.Item>
      <Menu.Item key="exit">
        <Button style={{ width: "100%" }} onClick={exit}>
          Exit
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <h1>{userData.fullName}</h1>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <EllipsisOutlined
                  className="h3 font-weight-bold"
                  key="ellipsis"
                />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Modal
        title="Edit your data"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form {...formLayout} form={form}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "To'ldirilmagan!",
              },
            ]}
          >
            <Input placeholder="Enter your full name..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "To'ldirilmagan!",
              },
            ]}
          >
            <Input placeholder="Enter your full name..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDashboard;
