import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Input, Menu, message, Modal, Row, Space } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formLayout } from './Students';

const base = 'https://coursesnodejs.herokuapp.com/';

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [adminToken, setAdminToken] = useState(null); // Move localStorage to state
  const [form] = Form.useForm();

  const roleId = '62b3035f8a51f81a13adba40';
  const navigate = useNavigate();

  useEffect(() => {
    // Access localStorage only on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('isAdminAuthenticated');
      setAdminToken(token);
      if (token) {
        getAdmin(token);
      }
    }
  }, []);

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const getAdmin = (token) => {
    axios({
      url: `${base}employee/paging?page=1&limit=1000`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setData(res.data.data.data);
    });
  };

  const editAdmin = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const exit = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    navigate('/');
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="edit">
        <Button style={{ width: '100%' }}>Edit</Button>
      </Menu.Item>
      <Menu.Item key="delete">
        <Button style={{ width: '100%' }} type="ghost">
          Delete
        </Button>
      </Menu.Item>
      <Menu.Item key="exit">
        <Button style={{ width: '100%' }} onClick={exit}>
          Exit
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <h1>User</h1>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <EllipsisOutlined className="h3 font-weight-bold" key="ellipsis" />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Modal
          okText="Saqlash"
          cancelText="Bekor qilish"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form {...formLayout} form={form}>
            <Form.Item label="Full name" name="fullName" rules={[{ required: true, message: "To'ldirilmagan" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "To'ldirilmagan" }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};

export default Dashboard;
