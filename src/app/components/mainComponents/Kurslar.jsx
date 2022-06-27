import { Card, Col, Row } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../constants/api";
import { Tabs } from "antd";
import { v4 as uuidv4 } from "uuid";
// import Meta from "antd/lib/card/Meta";
const { Meta } = Card;
const { TabPane } = Tabs;

const apiToken = localStorage.getItem("isAdminAuthenticated");

const Kurslar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios({
      method: "get",
      url: URL + "employee/course?limit=5&page=1",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFkNjAxOGRjMWY1ZjE5ZTViZWYxN2IiLCJpYXQiOjE2NTU2Mzk1NTksImV4cCI6MTY1NjI0NDM1OX0.cMBXv4G8Dsu0bCZwBtybfdebBRWxLvi44fhUepPj5UE`,
      },
    }).then((res) => {
      setCategories(res.data.data.data);
    });
  };

  return (
    <>
      <h1>Kurslar</h1>

      <Row gutter={[16, 16]} className="container justify-content-between">
        {categories.map((book) => (
          <Col xs={24} sm={12} md={8} xl={6} key={uuidv4()}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  alt="example"
                  src={
                    book.imgUrl.slice(0, 4) === "img/"
                      ? `${URL}${book.imgUrl}`
                      : book.imgUrl.slice(0, 4) === null ||
                        book.imgUrl.slice(0, 4) !== "http"
                      ? `https://images.unsplash.com/photo-1655909248336-7b1491cf58b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`
                      : book.imgUrl
                  }
                  onClick={() => {
                    console.log(book.imgUrl.slice(0, 4));
                  }}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              }
            >
              <Meta title={book.name} description={book.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Kurslar;
