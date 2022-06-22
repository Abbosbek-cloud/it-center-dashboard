import { Card, Col, Row } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../constants/api";
import { Tabs } from "antd";
import { v4 as uuidv4 } from "uuid";
const { Meta } = Card;
const { TabPane } = Tabs;

const Kitoblar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios({
      method: "get",
      url: URL + "user/category?page=1&limit=10",
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
                <Row
                  key={category.id}
                  gutter={[16, 16]}
                  style={{ paddingInline: "20px" }}
                >
                  {category.books.map((book) => (
                    <Col xs={24} sm={24} md={6} key={uuidv4()}>
                      <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="example" src={book.imgUrl} />}
                      >
                        <Meta
                          title={book.name}
                          description="www.instagram.com"
                        />
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
