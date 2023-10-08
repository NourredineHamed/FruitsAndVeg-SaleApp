import React, { useState } from "react";
import styles from "./ProductManagement.module.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      isTop: true,
      setType: "Type 1",
      price: 10.99,
      urlimg: "image1.jpg",
      remainingQuantity: 50,
    },
    {
      id: 2,
      name: "Product 2",
      isTop: false,
      setType: "Type 2",
      price: 19.99,
      urlimg: "image2.jpg",
      remainingQuantity: 20,
    },
    {
      id: 3,
      name: "Product 3",
      isTop: true,
      setType: "Type 1",
      price: 15.99,
      urlimg: "image3.jpg",
      remainingQuantity: 10,
    },
  ]);

  const [editableProduct, setEditableProduct] = useState(null);

  const handleEdit = (product) => {
    setEditableProduct(product);
  };

  const handleSave = () => {
    setEditableProduct(null);
  };

  const handleDelete = (productId) => {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(filteredProducts);
  };

  const handleInputChange = (e, field, product) => {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, [field]: e.target.value };
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const handleAddRow = () => {
    const newId = Math.max(...products.map((product) => product.id)) + 1;
    const newProduct = {
      id: newId,
      name: "",
      isTop: false,
      setType: "",
      price: 0,
      urlimg: "",
      remainingQuantity: 0,
    };
    setProducts([...products, newProduct]);
    setEditableProduct(newProduct);
  };

  return (
    <div className={styles.div4}>
      <div className={styles.container4}>
        <h2>Product Management</h2>
        <button onClick={handleAddRow} className={styles.button4}>
          <img
            className={styles.icon}
            src={process.env.PUBLIC_URL + "./icons/add.svg"}
            alt="Add Icon"
          />
          Add New
        </button>
      </div>
      <table className={styles.table4}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Is Top</th>
            <th>Set Type</th>
            <th>Price</th>
            <th>URL Image</th>
            <th>Remaining Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editableProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange(e, "name", product)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editableProduct?.id === product.id ? (
                  <input
                    type="checkbox"
                    checked={product.isTop}
                    onChange={(e) => handleInputChange(e, "isTop", product)}
                  />
                ) : (
                  product.isTop.toString()
                )}
              </td>
              <td>
                {editableProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={product.setType}
                    onChange={(e) => handleInputChange(e, "setType", product)}
                  />
                ) : (
                  product.setType
                )}
              </td>
              <td>
                {editableProduct?.id === product.id ? (
                  <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleInputChange(e, "price", product)}
                  />
                ) : (
                  product.price.toFixed(2)
                )}
              </td>
              <td>
                {editableProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={product.urlimg}
                    onChange={(e) => handleInputChange(e, "urlimg", product)}
                  />
                ) : (
                  product.urlimg
                )}
              </td>
              <td>
                {editableProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={product.remainingQuantity}
                    onChange={(e) =>
                      handleInputChange(e, "remainingQuantity", product)
                    }
                  />
                ) : (
                  product.remainingQuantity
                )}
              </td>
              <td>
                {editableProduct?.id === product.id ? (
                  <div>
                    <button
                      onClick={handleSave}
                      className={styles.deletebutton}
                    >
                      <img
                        className={styles.icondelete}
                        src="./icons/tick.svg"
                        alt="Save Icon"
                      />
                    </button>
                  </div>
                ) : (
                  <div  className={styles.buttonContainer}>
                    <button
                      onClick={() => handleEdit(product)}
                      className={styles.deletebutton}
                    >
                      <img
                        className={styles.icondelete}
                        src={process.env.PUBLIC_URL + "./icons/update.svg"}
                        alt="Save Icon"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={styles.deletebutton} // Apply the button class
                    >
                      <img
                        className={styles.icondelete}// Apply the icon class
                        src={process.env.PUBLIC_URL + "./icons/Delete.svg"}
                        alt="Delete Icon"
                      />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
