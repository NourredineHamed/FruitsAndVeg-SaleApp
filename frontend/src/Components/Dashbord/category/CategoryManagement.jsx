import React, { useState } from "react";
import styles from "./Category.module.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      idCategory: 1,
      name: "Category 1",
      created_at: "2023-05-01",
      updated_at: "2023-05-02",
    },
    {
      idCategory: 2,
      name: "Category 2",
      created_at: "2023-05-03",
      updated_at: "2023-05-04",
    },
    {
      idCategory: 3,
      name: "Category 3",
      created_at: "2023-05-05",
      updated_at: "2023-05-06",
    },
  ]);

  const [editableCategory, setEditableCategory] = useState(null);

  const handleEdit = (category) => {
    setEditableCategory(category);
  };

  const handleSave = () => {
    setEditableCategory(null);
  };

  const handleDelete = (categoryId) => {
    const filteredCategories = categories.filter(
      (category) => category.idCategory !== categoryId
    );
    setCategories(filteredCategories);
  };

  const handleInputChange = (e, field, category) => {
    const updatedCategories = categories.map((c) => {
      if (c.idCategory === category.idCategory) {
        return { ...c, [field]: e.target.value };
      }
      return c;
    });
    setCategories(updatedCategories);
  };

  const handleAddRow = () => {
    const newId =
      Math.max(...categories.map((category) => category.idCategory)) + 1;
    const newCategory = {
      idCategory: newId,
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
            <tr key={category.idCategory}>
              <td>{category.idCategory}</td>
              <td>
                {editableCategory?.idCategory === category.idCategory ? (
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleInputChange(e, "name", category)}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editableCategory?.idCategory === category.idCategory ? (
                  <input
                    type="text"
                    value={category.created_at}
                    onChange={(e) =>
                      handleInputChange(e, "created_at", category)
                    }
                  />
                ) : (
                  category.created_at
                )}
              </td>
              <td>
                {editableCategory?.idCategory === category.idCategory ? (
                  <input
                    type="text"
                    value={category.updated_at}
                    onChange={(e) =>
                      handleInputChange(e, "updated_at", category)
                    }
                  />
                ) : (
                  category.updated_at
                )}
              </td>
              <td>
                {editableCategory?.idCategory === category.idCategory ? (
                  
                  <button onClick={handleSave} className={styles.deletebutton}>
                    <img
                      className={styles.icondelete}
                      src={process.env.PUBLIC_URL + "/icons/tick.svg"}
                      alt="Save Icon"
                    />
                  </button>
                ) : (
                  <div  className={styles.buttonContainer}>
                    <button className={styles.deletebutton} onClick={() => handleEdit(category)}>
                      <img
                        className={styles.icondelete}
                        src={process.env.PUBLIC_URL + "/icons/update.svg"}
                        alt="Update Icon"
                      />
                    </button>
                    <button className={styles.deletebutton} onClick={() => handleDelete(category.idCategory)}>
                      <img
                        className={styles.icondelete}
                        src={process.env.PUBLIC_URL + "/icons/Delete.svg"}
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

export default CategoryManagement;
