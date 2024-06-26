import React, { useState } from "react";
import MenuBar from "../component/menubar/MenuBar";
import ProductContainer from "../component/product/ProductContainer";

const ProductPage = () => {
  const [searchWord, setSearchWord] = useState("");

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div>
      <MenuBar
        searchWord={searchWord}
        handleSearchChange={handleSearchChange}
      />
      <ProductContainer searchWord={searchWord} />
    </div>
  );
};

export default ProductPage;
