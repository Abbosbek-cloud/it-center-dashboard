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
  Select,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "./api";

export const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Students = () => {
  const [book, setBook] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { Meta } = Card;
  const apiToken = localStorage.getItem("isAdminAuthenticated");
  useEffect(() => {
    getBooks();
    getCategories();
    getAuthor();
    getAdmins();
  }, []);

  const getAdmins = () => {
    axios({
      url: `${BASE_URL}employee/paging?page=1&limit=5`,
      method: "get",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }).then((res) => setAdmins(res.data.data.data));
  };

  const getCategories = () => {
    axios({
      url: `${BASE_URL}employee/category?limit=5&page=1`,
      method: "get",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }).then((res) => {
      setCategories(res.data.data.data);
    });
  };

  const getAuthor = () => {
    axios({
      url: `${BASE_URL}employee/author?page=1&limit=5`,
      method: "get",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }).then((res) => {
      setAuthors(res.data.data.data);
    });
  };

  const getBooks = () => {
    axios({
      method: "get",
      url: `${BASE_URL}employee/book?limit=10&page=${page < 1 ? 1 : page}`,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }).then((res) => {
      setBook(res.data.data.data);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onEdit = (book) => {
    setSelected(book);
    setIsModalVisible(true);
    form.setFieldsValue(book);
  };

  const onDelete = (aBook) => {
    axios({
      url: `${BASE_URL}employee/book/${aBook._id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      data: aBook,
    }).then((res) => {
      getBooks();
      message.info(`Book deleted width id: ${aBook._id}`);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveBook = () => {
    form.validateFields().then((values) => {
      selected
        ? axios({
            url: `${BASE_URL}employee/book`,
            method: "put",
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
            data: { ...values, _id: selected._id },
          }).then((res) => {
            getBooks();
            setIsModalVisible(false);
            form.resetFields();
            setSelected("");
          })
        : axios({
            url: `${BASE_URL}employee/book`,
            method: "post",
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
            data: { ...values },
          }).then((res) => {
            getBooks();
            setIsModalVisible(false);
            form.resetFields();
          });
    });
  };

  return (
    <>
      <Row className="d-flex align-items-center justify-content-between">
        <Col>
          <h1>Kitoblar</h1>
        </Col>
        <Col>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {book.length ? (
          book.map((item) => (
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
                    onClick={() => onDelete(item)}
                  />,
                ]}
              >
                <Skeleton loading={false} avatar active>
                  <Meta title={item.name.split(",").slice(0, 1)} />
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
        <Row
          style={{
            width: "100%",
          }}
          className="d-flex justify-content-between align-items-center"
        >
          <Col>
            <Button
              type="primary"
              disabled={page === 1 ? true : false}
              onClick={() => {
                setPage(page === 1 ? 1 : page - 1);
                getBooks();
              }}
            >
              Page {page === 1 ? 1 : page - 1}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={page === book.length ? true : false}
              onClick={() => {
                setPage(page === book.length ? book.length : page + 1);
                getBooks();
              }}
            >
              Page {page}
            </Button>
          </Col>
        </Row>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={saveBook}
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
              label="E Book Url"
              name="ebookUrl"
              rules={[{ required: true, message: "To'ldirilmagan" }]}
            >
              <Input placeholder="Enter eBookUrl" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "To'ldirilmagan" }]}
            >
              <Input placeholder="Enter description for the book" />
            </Form.Item>
            <Form.Item label="Category for book" name="categoryId">
              <Select>
                {categories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name.toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Author for book" name="authorId">
              <Select>
                {authors.map((author) => (
                  <Select.Option value={author._id}>
                    {author.fullName.toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Admin for book" name="updateBy">
              <Select>
                {admins.map((ad) => (
                  <Select.Option key={ad._id} value={ad._id}>
                    {ad.fullName.toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};

export default Students;
