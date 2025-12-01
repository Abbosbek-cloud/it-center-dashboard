import { Card, Col, Row } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../adminPanel/api';
import PrevNext from '../mainComponents/PrevNext';
import { user_token } from './userApi';

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
      method: 'get',
      headers: { Authorization: `Bearer ${user_token}` },
    }).then((res) => {
      setBooks(res.data.data.data);
      setLoading(false);
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <h1>Library</h1>
      <Row span={24} gutter={[16, 16]}>
        {books.map((book) => (
          <Col xs={24} sm={24} md={12} xl={8} key={book._id}>
            <Card
              hoverable
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              cover={
                <img
                  alt="example"
                  src={
                    book.imgUrl.slice(0, 4) === 'img/'
                      ? `${URL}${book.imgUrl}`
                      : book.imgUrl.slice(0, 4) === null || book.imgUrl.slice(0, 4) !== 'http'
                      ? `https://images.unsplash.com/photo-1655909248336-7b1491cf58b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`
                      : book.imgUrl
                  }
                />
              }
            >
              <Meta title={book.name} description="Awesome book" />
            </Card>
          </Col>
        ))}
        <PrevNext item={books} page={page} func={getBooks} setLer={setPage} />
      </Row>
    </div>
  );
};

export default Books;
