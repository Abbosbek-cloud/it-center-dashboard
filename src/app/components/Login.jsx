import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { formLayout } from "./adminPanel/Students";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const form = Form.useForm();

  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    if (values.username === "Admin" && values.password === "student2") {
      getAdmin(values);
    } else if (values.password !== "student") {
      getUser(values);
    } else {
      navigate("/signup");
    }
  };

  const getAdmin = (data) => {
    axios({
      method: "post",
      url: "https://coursesnodejs.herokuapp.com/employee/sign-in",
      data: data,
    }).then((res) => {
      if (res.status === 200 && data.password === "student2") {
        handleAdmin(res.data.data.token);
      }
    });
  };

  const getUser = (data) => {
    axios({
      method: "post",
      url: "https://coursesnodejs.herokuapp.com/user/sign-in",
      data: data,
    }).then((res) => {
      handleUser();
    });
  };

  const handleAdmin = (token) => {
    localStorage.setItem("isAdminAuthenticated", token);
    navigate("/admin/dashboard");
  };

  const handleUser = () => {
    navigate(`/user`);
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
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
          <Input.Password />
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

export default Login;
