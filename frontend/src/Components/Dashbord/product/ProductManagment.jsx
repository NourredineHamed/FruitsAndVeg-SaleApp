import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductManagement.module.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editableProducts, setEditableProducts] = useState(null);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []); 

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categorie/allcat");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productResponse = await axios.get("http://localhost:4000/api/product");
      const productData = productResponse.data;
      const fetchedProducts = Array.isArray(productData.items) ? productData.items : [];

      const initialEditableProducts = fetchedProducts.reduce((acc, product) => {
        acc[product.idProduct] = false;
        return acc;
      }, {});

      const productsWithCategories = await Promise.all(
        fetchedProducts.map(async (product) => ({
          ...product,
          categoryName: await getCategoryName(product.categorieIdCategorie),
        }))
      );

      setProducts(productsWithCategories);
      setEditableProducts(initialEditableProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.log("Response:", error.response);
    }
  };

  const getCategoryName = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/categorie/${categoryId}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error(`Error fetching category name for ID ${categoryId}:`, error);
      return "";
    }
  };
  

  const handleEdit = (productId) => {
    setEditableProducts({ ...editableProducts, [productId]: true });
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/product/delete/${productId}`
      );

      // If the delete request is successful, update the state
      const filteredProducts = products.filter(
        (product) => product.idProduct !== productId
      );
      setProducts(filteredProducts);
    } catch (error) {
      // Handle errors if the API request fails
      console.error("Error deleting product:", error);
    }
  };
  const handleInputChange = (e, field, productId) => {
    const updatedProducts = products.map((product) => {
      if (product.idProduct === productId) {
        return {
          ...product,
          [field]: field === "isTop" ? e.target.checked : e.target.value,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleAddRow = () => {
    // Use a temporary flag to indicate that this is a new product
    const newProduct = {
      idProduct: null, 
      isNew: true, 
      name: "",
      isTop: false, 
      sellType: "",
      price: 0,
      urlImg: "",
      categorieIdCategorie: null,
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
          const numericRemainingQuantity = parseInt(
            newProductData.remainingQuantity,
            10
          );

          // Make an API request to create the new product
          const response = await axios.post(
            "http://localhost:4000/api/product/create",
            {
              ...newProductData,
              price: numericPrice,
              remainingQuantity: numericRemainingQuantity,
              categorieIdCategorie: parseInt(
                newProduct.categorieIdCategorie,
                10
              ),
            }
          );

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
           fetchProducts();
        }
      } else {
        const updatedProductIndex = products.findIndex(
          (p) => p.idProduct === productId
        );
        if (updatedProductIndex !== -1) {
          const updatedProduct = products[updatedProductIndex];

          // Make an API request to update the product
          await axios.put(
            `http://localhost:4000/api/product/update/${productId}`,
            {
              name: updatedProduct.name,
              isTop: updatedProduct.isTop,
              sellType: updatedProduct.sellType,
              price: updatedProduct.price,
              urlImg: updatedProduct.urlImg,
              remainingQuantity: updatedProduct.remainingQuantity,
              categorieIdCategorie: parseInt(
                updatedProduct.categorieIdCategorie,
                10
              ),
            }
          );

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

           fetchProducts();
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
      console.log("Error response:", error.response); // Log the full error response
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
            <th>Category</th>
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
                    onChange={(e) =>
                      handleInputChange(e, "name", product.idProduct)
                    }
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
                    onChange={(e) =>
                      handleInputChange(e, "isTop", product.idProduct)
                    }
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
                    onChange={(e) =>
                      handleInputChange(e, "sellType", product.idProduct)
                    }
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
                    onChange={(e) =>
                      handleInputChange(e, "price", product.idProduct)
                    }
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
                    onChange={(e) =>
                      handleInputChange(e, "urlImg", product.idProduct)
                    }
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
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "remainingQuantity",
                        product.idProduct
                      )
                    }
                  />
                ) : (
                  product.remainingQuantity
                )}
              </td>
              <td>
  {editableProducts[product.idProduct] ? (
    <select
      value={product.categorieIdCategorie}
      onChange={(e) =>
        handleInputChange(e, "categorieIdCategorie", product.idProduct)
      }
      style={{ width: '150px' }} >
      <option value="" disabled>Select a category</option>
      {categories.map((category) => (
        <option key={category.idCategorie} value={category.idCategorie}>
          {category.name}
        </option>
      ))}
    </select>
  ) : (
    product.categoryName
  )}
</td>

              <td>
                {editableProducts[product.idProduct] ? (
                  <div>
                    <button
                      onClick={() => handleSave(product.idProduct)}
                      className={styles.deletebutton}
                    >
                         <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/tick.svg'} alt="Save Icon" />
                    </button>
                  </div>
                ) : (
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => handleEdit(product.idProduct)}
                      className={styles.deletebutton}
                    >
                    <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/update.svg'} alt="Update Icon" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.idProduct)}
                      className={styles.deletebutton} // Apply the button class
                    >
                               <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/Delete.svg'} alt="Delete Icon" />
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
