import React from 'react';
import ListOfSearchedData from './ListOfSearchedData';
import NothingFound from './NothingFound';
import SearchedItem from './SearchedItem';

const LandingSearchComp = ({ isShow, isShown, data, setler, handler, selectedProduct }) => {
  return (
    <div className={isShow ? `d-block` : `d-none`}>
      {data.length === 1 ? (
        <SearchedItem data={data} setter={setler} isShown={isShown} />
      ) : data.length >= 1 ? (
        <ListOfSearchedData dataHandler={handler} dataOne={selectedProduct} setler={setler} data={data} />
      ) : (
        <NothingFound />
      )}
    </div>
  );
};

export default LandingSearchComp;
