import { Card, Col, Row } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { URL } from '../../constants/api';
import { Tabs } from 'antd';
import { v4 as uuidv4 } from 'uuid';
const { Meta } = Card;
const { TabPane } = Tabs;

const Kitoblar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios({
      method: 'get',
      url: URL + 'user/category?page=1&limit=10',
    })
      .then((res) => {
        setCategories(res.data.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onChange = (key) => {};

  return (
    <>
      <h1>Kitoblar</h1>
      <Row>
        <Col span={24}>
          <Tabs onChange={onChange} type="card">
            {categories.map((category) => (
              <TabPane tab={category.name.toUpperCase()} key={uuidv4()}>
                <Row key={category.id} gutter={[16, 16]} style={{ paddingInline: '20px' }}>
                  {category.books.map((book) => (
                    <Col xs={24} sm={12} md={8} xl={6} key={uuidv4()}>
                      <Card
                        hoverable
                        style={{ width: '100%' }}
                        cover={
                          <img
                            alt="example"
                            style={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'cover',
                            }}
                            src={
                              bbook.imgUrl.slice(0, 4) === 'img/'
                                ? `${URL}${book.imgUrl}`
                                : book.imgUrl.slice(0, 4) === null || book.imgUrl.slice(0, 4) !== 'http'
                                ? `https://images.unsplash.com/photo-1655909248336-7b1491cf58b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`
                                : book.imgUrl
                            }
                            onClick={() => {
                              console.log();
                            }}
                          />
                        }
                      >
                        <Meta title={book.name} description="www.instagram.com" />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Kitoblar;
