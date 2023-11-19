import React, { useState, useEffect } from "react";
import styles from "./Category.module.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editableCategory, setEditableCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/categorie/allcat"
      );
      const data = await response.json();
      setCategories(data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (category) => {
    // Create a copy of the category without the 'products' property
    const categoryWithoutProducts = { ...category };
    delete categoryWithoutProducts.products;
  
    // Set the editableCategory without the 'products' property
    setEditableCategory(categoryWithoutProducts);
  };
  const handleDelete = async (categoryId) => {
    try {
      // Make a DELETE request to the API
      await fetch(`http://localhost:4000/api/categorie/delete/${categoryId}`, {
        method: "DELETE",
      });
  
      // After successful deletion, refresh the category list
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  const handleSave = async () => {
    try {
      console.log("editableCategory:", editableCategory);
      if (!editableCategory.idCategorie) {
        // If the category doesn't have an id, it's a new category
        await fetch("http://localhost:4000/api/categorie/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editableCategory.name,
            // Exclude createdAt and updatedAt if not needed by the API
          }),
        });
        fetchCategories();
      } else {
        // If the category has an id, it's an existing category
        console.log("editableCategory:", editableCategory);
        await fetch(
          `http://localhost:4000/api/categorie/update/${editableCategory.idCategorie}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editableCategory),
          }
        );
        fetchCategories();
      }
  
      // Refresh the category list after updating or creating

      setEditableCategory(null);
    } catch (error) {
      console.error("Error updating/creating category:", error);
    }
  };
  

  const handleInputChange = (e, field) => {
    const updatedCategory = {
      ...editableCategory,
      [field]: e.target.value,
    };
  
    setEditableCategory(updatedCategory);
  
    // Update the state of the categories array
    const updatedCategories = categories.map((c) =>
      c.idCategorie === updatedCategory.idCategorie ? updatedCategory : c
    );
    setCategories(updatedCategories);
  };
  

  const handleAddRow = () => {
    const newCategory = {
      name: " ", // Set a default name or an appropriate value

    };

    // Add the new category to the beginning of the categories array
    setCategories([newCategory, ...categories]);
    setEditableCategory(newCategory);
  };

  return (
    <div className={styles.div2}>
      <div className={styles.container2}>
        <h2>Category Management</h2>
        <button onClick={handleAddRow} className={styles.container2}>
          <img
            className={styles.icon}
            src={process.env.PUBLIC_URL + "/icons/add.svg"}
            alt="Add Icon"
          />
          Add New
        </button>
      </div>

      <table className={styles.table2}>
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.idCategorie}>
              <td>{category.idCategorie}</td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <input
                    type="text"
                    value={editableCategory?.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>{category.createdAt}</td>
              <td>{category.updatedAt}</td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <button onClick={handleSave} className={styles.deletebutton}>
                    <img
                      className={styles.icondelete}
                      src={process.env.PUBLIC_URL + "/icons/tick.svg"}
                      alt="Save Icon"
                    />
                  </button>
                ) : (
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.deletebutton}
                      onClick={() => handleEdit(category)}
                    >
                      <img
                        className={styles.icondelete}
                        src={process.env.PUBLIC_URL + "/icons/update.svg"}
                        alt="Update Icon"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(category.idCategorie)}
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

export default CategoryManagement;
