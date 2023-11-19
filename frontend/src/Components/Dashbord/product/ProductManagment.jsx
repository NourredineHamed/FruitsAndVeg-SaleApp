import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductManagement.module.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  // Use an object to track the edit state for each product
  const [editableProducts, setEditableProducts] = useState(null);

  useEffect(() => {
    console.log('Products:', products);
    console.log('Editable Products:', editableProducts);
    // Fetch products from the API when the component mounts
    fetchProducts();
  }, []); // Add dependencies if needed
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product");
      console.log(response.data); // Log the response data

      const responseData = response.data;
      const fetchedProducts = Array.isArray(responseData.items) ? responseData.items : [];

      // Initialize the edit state for each product
      const initialEditableProducts = fetchedProducts.reduce((acc, product) => {
        acc[product.idProduct] = false;
        return acc;
      }, {});

      setProducts(fetchedProducts);
      setEditableProducts(initialEditableProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.log("Response:", error.response); // Log the error response
    }
  };

  const handleEdit = (productId) => {
    // Set the edit state to true for the selected product
    setEditableProducts({ ...editableProducts, [productId]: true });
  };

  const handleDelete = async (productId) => {
    try {
      // Make an API request to delete the product
      await axios.delete(`http://localhost:4000/api/product/delete/${productId}`);
  
      // If the delete request is successful, update the state
      const filteredProducts = products.filter(
        (product) => product.idProduct !== productId
      );
      setProducts(filteredProducts);
    } catch (error) {
      // Handle errors if the API request fails
      console.error('Error deleting product:', error);
    }
  };
  const handleInputChange = (e, field, productId) => {
    const updatedProducts = products.map((product) => {
      if (product.idProduct === productId) {
        return { ...product, [field]: field === "isTop" ? e.target.checked : e.target.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };
  
  const handleAddRow = () => {
    // Use a temporary flag to indicate that this is a new product
    const newProduct = {
      idProduct: null, // Set idProduct to null for new products
      isNew: true, // Add a flag to indicate that this is a new product
      name: "",
      isTop: false, // Initialize isTop to false
      sellType: "",
      price: 0,
      urlImg: "",
      categorieIdCategorie: 1,
      remainingQuantity: 0,
    };

    // Add the new product to the state
    setProducts([...products, newProduct]);

    // Set the edit state to true for the newly added product
    setEditableProducts({ ...editableProducts, [newProduct.idProduct]: true });
  };

  const handleSave = async (productId) => {
    try {
      if (productId === null) {
        const newProductIndex = products.findIndex((p) => p.isNew === true);
  
        if (newProductIndex !== -1) {
          const newProduct = products[newProductIndex];
  
          // Extract the new product data, excluding the isNew flag
          const { isNew, ...newProductData } = newProduct;
  
          // Convert price and remainingQuantity to numbers
          const numericPrice = parseFloat(newProductData.price);
          const numericRemainingQuantity = parseInt(newProductData.remainingQuantity, 10);
  
          // Make an API request to create the new product
          const response = await axios.post('http://localhost:4000/api/product/create', {
            ...newProductData,
            price: numericPrice,
            remainingQuantity: numericRemainingQuantity,
          });
  
          // Update the new product in the state with the actual ID from the response
          const createdProduct = response.data;
  
          // Update the state by replacing the new product with the created one
          setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(newProductIndex, 1, createdProduct);
            return updatedProducts;
          });
  
          // Set the edit state to false for the newly created product
          setEditableProducts((prevEditableProducts) => {
            const newEditableProducts = { ...prevEditableProducts };
            delete newEditableProducts[newProduct.idProduct]; // Remove temporary flag
            newEditableProducts[createdProduct.idProduct] = false; // Set the actual ID
            return newEditableProducts;
          });
  
          // Fetch the updated data again
          await fetchProducts();
        }
      } else {
        const updatedProductIndex = products.findIndex((p) => p.idProduct === productId);
        if (updatedProductIndex !== -1) {
          const updatedProduct = products[updatedProductIndex];
  
          // Hardcode the categorieIdCategorie value
          const hardcodedCategorieId = 1; // Change this value to the desired category ID
  
          // Add the hardcoded categorieIdCategorie to the updatedProduct
          updatedProduct.categorieIdCategorie = hardcodedCategorieId;
  
          // Make an API request to update the product
          await axios.put(`http://localhost:4000/api/product/update/${productId}`, updatedProduct);
  
          // Update the product in the state
          setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(updatedProductIndex, 1, updatedProduct);
            return updatedProducts;
          });
  
          // Set the edit state to false for the updated product
          setEditableProducts((prevEditableProducts) => {
            const newEditableProducts = { ...prevEditableProducts };
            newEditableProducts[productId] = false;
            return newEditableProducts;
          });
  
          // Fetch the updated data again (if needed)
          // await fetchProducts();
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      console.log('Error response:', error.response); // Log the full error response
    }
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
            <tr key={product.idProduct}>
              <td>{product.idProduct}</td>
              <td>
                {editableProducts[product.idProduct] ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange(e, "name", product.idProduct)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
  {editableProducts[product.idProduct] ? (
    <input
      type="checkbox"
      checked={product.isTop}
      onChange={(e) => handleInputChange(e, "isTop", product.idProduct)}
    />
  ) : (
    <span>{product.isTop ? "True" : "False"}</span>
  )}
</td>

              <td>
                {editableProducts[product.idProduct] ? (
                  <input
                    type="text"
                    value={product.sellType}
                    onChange={(e) => handleInputChange(e, "sellType", product.idProduct)}
                  />
                ) : (
                  product.sellType
                )}
              </td>
              <td>
                {editableProducts[product.idProduct] ? (
                  <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleInputChange(e, "price", product.idProduct)}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editableProducts[product.idProduct] ? (
                  <input
                    type="text"
                    value={product.urlImg}
                    onChange={(e) => handleInputChange(e, "urlImg", product.idProduct)}
                  />
                ) : (
                  product.urlImg
                )}
              </td>
              <td>
                {editableProducts[product.idProduct] ? (
                  <input
                    type="number"
                    value={product.remainingQuantity}
                    onChange={(e) => handleInputChange(e, "remainingQuantity", product.idProduct)}
                  />
                ) : (
                  product.remainingQuantity
                )}
              </td>
              <td>
                {editableProducts[product.idProduct] ? (
                  <div>
                    <button
                      onClick={() => handleSave(product.idProduct)}
                      className={styles.deletebutton}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div  className={styles.buttonContainer}>
                    <button
                      onClick={() => handleEdit(product.idProduct)}
                      className={styles.deletebutton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.idProduct)}
                      className={styles.deletebutton} // Apply the button class
                    >
                      Delete
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
