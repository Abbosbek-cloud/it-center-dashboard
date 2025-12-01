import { Badge, Button, Col, Row } from 'antd';
import React from 'react';

const PrevNext = ({ item, page, func, setLer }) => {
  return (
    <Row span={24} style={{ width: '100%' }} className="d-flex align-items-center justify-content-between">
      <Col>
        <Button
          type="primary"
          disabled={page === 1 ? true : false}
          onClick={() => {
            setLer(page === 1 ? 1 : page - 1);
            func();
          }}
        >
          Prev
        </Button>
      </Col>
      <Col className="d-flex align-items-center">
        <Badge className="bg-primary text-light p-2 px-4 h6 mb-0 rounded" size="large">
          {page}
        </Badge>
      </Col>
      <Col>
        <Button
          type="primary"
          disabled={page === item.length ? true : false}
          onClick={() => {
            setLer(page === item.length ? item.length : page + 1);
            func();
          }}
        >
          Next
        </Button>
      </Col>
    </Row>
  );
};

export default PrevNext;
