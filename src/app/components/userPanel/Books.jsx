import { Badge, Button, Card, Col, Row, Skeleton } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../adminPanel/api";
import { user_token } from "./userApi";

const { Meta } = Card;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios({
      url: `${BASE_URL}user/book?page=${page}&limit=10`,
      method: "get",
      headers: { Authorization: `Bearer ${user_token}` },
    }).then((res) => {
      setBooks(res.data.data.data);
      setLoading(false);
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <h1>Library</h1>
      <Row span={24} gutter={[16, 16]}>
        {books.map((book) => (
          <Col xs={24} sm={24} md={12} xl={8} key={book._id}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={<img alt="example" src={book.imgUrl} />}
            >
              <Meta title={book.name} description="Awesome book" />
            </Card>
          </Col>
        ))}
        <Row
          span={24}
          style={{ width: "100%" }}
          className="d-flex align-items-center justify-content-between"
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
              Prev
            </Button>
          </Col>
          <Col className="d-flex align-items-center">
            <Badge
              className="bg-primary text-light p-2 px-4 h6 mb-0 rounded"
              size="large"
            >
              {page}
            </Badge>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={page === books.length ? true : false}
              onClick={() => {
                setPage(page === books.length ? books.length : page + 1);
                getBooks();
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Books;
