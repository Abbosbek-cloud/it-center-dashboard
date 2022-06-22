import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { formLayout } from "./adminPanel/Students";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./adminPanel/api";
import { userToken } from "../constants/api";

const Signup = () => {
  const form = Form.useForm();

  const navigate = useNavigate();
  const onFinish = (values) => {
    getUser(values);
  };

  const getUser = (data) => {
    axios({
      method: "post",
      url: `${BASE_URL}user/sign-up`,
      data: data,
    }).then((res) => {
      handleUser(res.data.data.token);
      console.log();
    });
  };

  const handleUser = (token) => {
    navigate(`/user`);
    localStorage.setItem("Token", token);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    navigate("/signup");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form
        {...formLayout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Enter your name..." />
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
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          className="mx-auto"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Link className="d-block text-center" to="/signup">
          Do not have account
        </Link>
      </Form>
    </div>
  );
};

export default Signup;
