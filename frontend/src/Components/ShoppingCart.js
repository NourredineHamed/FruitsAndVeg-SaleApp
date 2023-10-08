import React, { useState } from 'react';
import './ShoppingCart.css';
import { RiDeleteBinLine } from 'react-icons/ri';


function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 1, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, quantity: 2, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30, quantity: 1, image: 'https://via.placeholder.com/150' }
  ]);

  const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleQuantityChange = (id, newQuantity) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex(item => item.id === id);
    newItems[itemIndex].quantity = newQuantity;
    setItems(newItems);
  };

  const handleRemoveItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  return (
    <div className='panier'>
      <h1 className="shopping-cart-title">Votre Panier</h1>
      {items.length === 0 ? (
        <p>Your shopping cart is empty</p>
      ) : (
        <table className="shopping-cart-table">
          <thead>
            <tr className="table-header">
              <th>Produit</th>
              <th>Quantité</th>
              <th>Totale</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="product-info">
                    <img className="product-image" src={item.image} alt={item.name} />
                    <div>
                      <p className="product-name">{item.name}</p>
                      <p className="product-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </td>
            
                <td>
                  <div className="quantity-control">
                    <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <input
                      className="quantity-input"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                    <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                    <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                  <RiDeleteBinLine/>
                  </button>

                  </div>
                </td>
                <td className='price'>${(item.price * item.quantity).toFixed(2)}</td>
                
              
              </tr>
            ))}
          </tbody>
          <tfoot className='table-footer'>
            <tr>
              
              <td colSpan="3"><strong>Total:   ${calculateTotal().toFixed(2)} <button className='submit-button' > Commander →</button> </strong>
              
                </td>
                
                
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}


export default ShoppingCart;
