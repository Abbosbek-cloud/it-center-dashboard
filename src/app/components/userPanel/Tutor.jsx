import { Button, Card, Col, Form, Input, Modal, Row, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../adminPanel/api";
import PrevNext from "../mainComponents/PrevNext";
import { user_token } from "./userApi";

const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Tutor = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios({
      url: `${BASE_URL}user/course?limit=10&page=${page}`,
      method: "get",
      headers: { Authorization: `Bearer ${user_token}` },
    }).then((res) => {
      setCourses(res.data.data.data);
      setLoading(false);
    });
  };

  const postOwnCourse = () => {
    form.validateFields().then((values) => {
      axios({
        url: `${BASE_URL}user/coursesUser`,
        method: "post",
        headers: { Authorization: `Bearer ${user_token}` },
        data: values,
      }).then((res) => {
        getCourses();
        setisModalVisible(false);
      });
    });
  };

  const showModal = () => {
    setisModalVisible(true);
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  console.log(courses);
  return (
    <div style={{ width: "100%" }}>
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <h1>Kurslar</h1>
        </Col>
        <Col>
          <Button onClick={showModal} type="primary">
            Qo'shish
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {courses.length ? (
          courses.map((course) => (
            <Col xs={24} sm={24} md={12} xl={8} xxl={6}>
              <Card
                hoverable
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
                cover={
                  <img
                    alt="example"
                    src={
                      course.imgUrl.slice(0, 4) === "img/"
                        ? `${URL}${course.imgUrl}`
                        : course.imgUrl.slice(0, 4) === null ||
                          course.imgUrl.slice(0, 4) !== "http"
                        ? `https://images.unsplash.com/photo-1655909248336-7b1491cf58b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`
                        : course.imgUrl
                    }
                  />
                }
                loading={courses.length ? false : true}
              >
                <Meta
                  title={course.description}
                  description="www.instagram.com"
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card
              hoverable
              style={{ width: 240 }}
              loading={loading}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        )}
      </Row>
      <PrevNext item={courses} page={page} func={getCourses} setLer={setPage} />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={postOwnCourse}
        onCancel={handleCancel}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form {...formLayout}>
          <Form.Item label="Choose a course" name="courseId">
            {courses.map((course) => (
              <Select
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
              >
                <Option value={course._id}>{course.name}</Option>
              </Select>
            ))}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tutor;
