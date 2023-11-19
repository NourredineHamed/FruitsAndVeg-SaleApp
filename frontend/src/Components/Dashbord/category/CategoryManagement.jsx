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
                    value={category.created_at}
                    onChange={(e) => handleInputChange(e, "created_at")}
                  />
                ) : (
                  category.created_at
                )}
              </td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <input
                    type="text"
                    value={category.updated_at}
                    onChange={(e) => handleInputChange(e, "updated_at")}
                  />
                ) : (
                  category.updated_at
                )}
              </td>
              <td>
                {editableCategory?.idCategorie === category.idCategorie ? (
                  <button onClick={handleSave} className={styles.deletebutton}>
                    Save
                  </button>
                ) : (
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.deletebutton}
                      onClick={() => handleEdit(category)}
                    >
                      Edit
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
