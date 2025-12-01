import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';

const BASE_URL = 'https://coursesnodejs.herokuapp.com/';

const SearchedItem = ({ data, setter }) => {
  console.log(data);
  return (
    <>
      {data.map((item) => (
        <Row key={item._id} style={{ height: '50vh', position: 'relative' }}>
          <CloseCircleOutlined
            onClick={() => setter(false)}
            className="hovered-icon-cancel"
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              fontSize: '2.5rem',
              color: 'black',
              cursor: 'pointer',
              zIndex: 999,
            }}
          />
          <Col xs={24} md={12} lg={12} xl={12} className="p-2">
            <img
              src={
                item.imgUrl.slice(0, 4) === 'img/'
                  ? `${BASE_URL}${item.imgUrl}`
                  : item.imgUrl.slice(0, 4) === null || item.imgUrl.slice(0, 4) !== 'http'
                  ? `https://images.unsplash.com/photo-1655909248336-7b1491cf58b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`
                  : item.imgUrl
              }
              style={{ width: '100%' }}
              alt="Lorem"
            />
          </Col>
          <Col xs={24} sm={24} md={12} style={{ height: '100%' }} className="p-2">
            <p style={{ height: '90%', overflow: 'scroll' }}>{item.description}</p>
            <p>1000%</p>
            <button className="btn btn-primary px-4 p-absolute bottom-0 w-auto h-auto">Buy</button>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default SearchedItem;
