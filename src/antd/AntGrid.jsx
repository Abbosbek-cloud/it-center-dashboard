import { Card, Col, Row } from "antd";
import React from "react";

const AntGrid = () => {
  return (
    <div className="container">
      <Row gutter={[8, 8]}>
        <Col span={12} md={8} lg={6}>
          <Card title="card-title" bordered={true}>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
          </Card>
        </Col>
        <Col span={12} md={8} lg={6}>
          <Card title="card-title" bordered={true}>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
          </Card>
        </Col>
        <Col span={12} md={8} lg={6}>
          <Card title="card-title" bordered={true}>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
          </Card>
        </Col>
        <Col span={12} md={8} lg={6}>
          <Card title="card-title" bordered={true}>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
            <p>Card component</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AntGrid;
