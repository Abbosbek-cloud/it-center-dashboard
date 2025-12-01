import React from 'react';
import SearchedItem from './SearchedItem';

const BASE_URL = 'https://coursesnodejs.herokuapp.com/';

const ListOfSearchedData = ({ data, dataHandler, dataOne, setler }) => {
  return (
    <div>
      <SearchedItem data={dataOne} setter={setler} />
      {data.map((item) => (
        <div
          key={item._id}
          className="w-100 d-flex p-2"
          onClick={() => {
            setler(true);
            dataHandler(item._id);
          }}
        >
          <div className="img-wrappers" style={{ width: '30%' }}>
            <img
              src={
                item.imgUrl.slice(0, 4) === 'img/'
                  ? `${BASE_URL}${item.imgUrl}`
                  : item.imgUrl.slice(0, 4) === null || item.imgUrl.slice(0, 4) !== 'http'
                  ? `https://images.unsplash.com/photo-1655909248336-7b1491cf58b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`
                  : item.imgUrl
              }
              onError={(event) => {
                console.log(event);
              }}
              // onError={(e)=>}
              style={{
                width: '100%',
                objectFit: 'cover',
              }}
              alt="lorem"
            />
          </div>
          <div className="infowrapper px-3">
            <h3>{item.name}</h3>
            <p className="pb-0">{item.description.slice(0, 30)}</p>
            <span>100$</span>
            {/* <Link
              to={`/${item.ebookUrl ? "book" : "course"}/${item._id}`}
              className="text-decoration-none"
            >
              More
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfSearchedData;
