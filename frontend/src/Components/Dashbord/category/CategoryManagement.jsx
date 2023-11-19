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
      const response = await fetch("http://localhost:4000/api/categorie/allcat");
      const data = await response.json();
      setCategories(data);
      console.log(response);
    } catch (error) {
      
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (category) => {
    setEditableCategory(category);
  };

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:4000/api/categorie/update/${editableCategory.idCategorie}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableCategory),
      });
      fetchCategories(); // Refresh the category list after updating
      setEditableCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };



  const handleInputChange = (e, field) => {
    const updatedCategory = { ...editableCategory, [field]: e.target.value };
    setEditableCategory(updatedCategory);
  };

  const handleAddRow = () => {
    const newCategory = {
      name: "",
      created_at: "",
      updated_at: "",
    };
    setCategories([...categories, newCategory]);
    setEditableCategory(newCategory);
  };

  return (
    <div className={styles.div2}>
      <div className={styles.container2}>
        <h2>Category Management</h2>
        <button onClick={handleAddRow} className={styles.button2}>
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
                    value={category.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <input
                    type="text"
                    value={category.createdAt}
                    onChange={(e) => handleInputChange(e, "createdAt")}
                  />
                ) : (
                  category.createdAt
                )}
              </td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <input
                    type="text"
                    value={category.updatedAt}
                    onChange={(e) => handleInputChange(e, "updatedAt")}
                  />
                ) : (
                  category.updatedAt
                )}
              </td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <button onClick={handleSave} className={styles.deletebutton}>
                      <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/tick.svg'} alt="Save Icon" />
                  </button>
                ) : (
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.deletebutton}
                      onClick={() => handleEdit(category)}
                    >
                        <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/update.svg'} alt="Update Icon" />
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
