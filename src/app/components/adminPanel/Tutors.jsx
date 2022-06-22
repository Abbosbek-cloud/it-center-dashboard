import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Skeleton,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./api";

const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const token = localStorage.getItem("isAdminAuthenticated");
const Tutors = () => {
  const [tutor, setTutor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  const { Meta } = Card;

  useEffect(() => {
    getTutors();
  }, []);

  const getTutors = () => {
    axios({
      url: `${BASE_URL}employee/course?limit=10&page=1`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setTutor(res.data.data.data);
      setLoading(false);
    });
  };

  const onEdit = (tutor) => {
    setSelected(tutor);
    setIsModalVisible(true);
    form.setFieldsValue(tutor);
  };

  const onDelete = (id) => {
    axios({
      url: `${BASE_URL}employee/course/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      getTutors();
      message.info(`Tutor deleted with ${id}`);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveTutor = () => {
    form.validateFields().then((values) => {
      const data = { ...values, _id: selected._id };
      selected
        ? axios({
            url: `${BASE_URL}employee/course`,
            method: "put",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: data,
          }).then((res) => {
            getTutors();
            setIsModalVisible(false);
            form.resetFields();
            setSelected("");
          })
        : axios({
            url: `${BASE_URL}employee/course`,
            method: "post",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: values,
          }).then((res) => {
            getTutors();
            setIsModalVisible(false);
            form.resetFields();
          });
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Row className="d-flex align-items-center justify-content-between">
        <Col>
          <h1>Kurslar</h1>
        </Col>
        <Col>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {tutor.length ? (
          tutor.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8} xl={6}>
              <Card
                style={{
                  width: "100%",
                  marginTop: 16,
                  flex: 1,
                }}
                cover={<img src={item.imgUrl} />}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" onClick={() => onEdit(item)} />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => onDelete(item._id)}
                  />,
                ]}
              >
                <Skeleton loading={false} avatar active>
                  <Meta
                    title={item.name.split(",").slice(0, 1)}
                    description={item.description}
                  />
                </Skeleton>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card
              style={{
                width: "100%",
                marginTop: 16,
              }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
          </Col>
        )}
        <Modal
          title="Tutors"
          visible={isModalVisible}
          onOk={saveTutor}
          onCancel={handleCancel}
          okText={selected ? "Qo'shish" : "Saqlash"}
          cancelText="Yopish"
        >
          <Form {...formLayout} form={form}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "To'ldirilmagan" }]}
            >
              <Input placeholder="Enter tutor name" />
            </Form.Item>
            <Form.Item
              label="Image url"
              name="imgUrl"
              rules={[{ required: true, message: "To'ldirilmagan" }]}
            >
              <Input placeholder="Enter img url" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "To'ldirilmagan" }]}
            >
              <Input placeholder="Enter description for a course" />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};

export default Tutors;
