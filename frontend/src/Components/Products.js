import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import Header from "./Header";
import Footer from "./Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  

  const handleSearch = () => {
    let results = [...products];
    if (searchText) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory) {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (sortBy === "price-low-to-high") {
      results = results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      results = results.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(results);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    handleSearch();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    handleSearch();
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
    <Header/>
    <div className="container">
      <h1> Nos Produits</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Légumes</option>
          <option value="clothing">Fruits</option>

        </select>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="">Sort By</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h4>${product.price}</h4>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button >{"<<"}</button>
        <button>1</button>
        <button>2</button>
        <button >{">>"}</button>
      </div>
    </div> <Footer/></>
  );
}

export default Products;
