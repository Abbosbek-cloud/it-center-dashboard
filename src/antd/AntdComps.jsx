import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import AntTable from "./AntTable";
import { useForm } from "antd/lib/form/Form";
import AntApiGet from "./AntApiGet";

const AntdComps = () => {
  const [form] = useForm();
  const [data, setData] = useState([]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const editData = (values) => {
    form.setFieldsValue(values);
  };

  const onFinish = (values) => {
    setData([...data, values]);
    form.resetFields();
  };

  return (
    <div className="container">
      <Row className="d-flex justify-content-center align-items-center mt-5">
        <Form {...formItemLayout} onFinish={onFinish} form={form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username kiriting!" }]}
          >
            <Input placeholder="Username kiritish..." />
          </Form.Item>
          <Form.Item
            label="Ism"
            name="ism"
            rules={[{ required: true, message: "Ism kiriting!" }]}
          >
            <Input placeholder="Ism kiritish..." />
          </Form.Item>
          <Form.Item
            className="text-center"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password kiriting!" }]}
          >
            <Input.Password placeholder="Username kiritish..." />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Send</Button>
          </Form.Item>
        </Form>
      </Row>
      <AntTable tableData={data} editData={editData} />
      <AntApiGet />
    </div>
  );
};

export default AntdComps;
