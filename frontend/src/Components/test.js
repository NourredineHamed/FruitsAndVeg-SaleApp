import React, { useState } from 'react';

const Product = ({ name, price, addToCart }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (name, price) => {
    const newItem = { name, price };
    setCartItems([...cartItems, newItem]);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <hr />
      <Product
        name="Example Product"
        price={9.99}
        addToCart={() => addToCart("Example Product", 9.99)}
      />
    </div>
  );
};

export default ShoppingCart;