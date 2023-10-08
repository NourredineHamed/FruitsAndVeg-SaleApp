import React, { useState } from "react";
import styles from "./Stock.module.css";
const StockManagement = () => {
  const [stocks, setStocks] = useState([
    {
      idStock: 1,
      qte: 10,
      itemPrice: 20.5,
      created_at: "2023-05-01",
      updated_at: "2023-05-05",
    },
    {
      idStock: 2,
      qte: 5,
      itemPrice: 15.75,
      created_at: "2023-05-02",
      updated_at: "2023-05-06",
    },
    {
      idStock: 3,
      qte: 8,
      itemPrice: 18.0,
      created_at: "2023-05-03",
      updated_at: "2023-05-07",
    },
  ]);

  const [editableStock, setEditableStock] = useState(null);

  const handleEdit = (stock) => {
    setEditableStock(stock);
  };

  const handleSave = () => {
    setEditableStock(null);
  };

  const handleDelete = (stockId) => {
    const filteredStocks = stocks.filter((stock) => stock.idStock !== stockId);
    setStocks(filteredStocks);
  };

  const handleInputChange = (e, field, stock) => {
    const updatedStocks = stocks.map((s) => {
      if (s.idStock === stock.idStock) {
        return { ...s, [field]: e.target.value };
      }
      return s;
    });
    setStocks(updatedStocks);
  };

  const handleAddRow = () => {
    const newId = Math.max(...stocks.map((stock) => stock.idStock)) + 1;
    const newStock = {
      idStock: newId,
      qte: 0,
      itemPrice: 0.0,
      created_at: "",
      updated_at: "",
    };
    setStocks([...stocks, newStock]);
    setEditableStock(newStock);
  };

  return (
    <div className={styles.div4}>
      <div className={styles.container4}>
        <h2>Stock Management</h2>
        <button onClick={handleAddRow} className={styles.button4}>
          <img
            className={styles.icon}
            src={process.env.PUBLIC_URL + "/icons/add.svg"}
            alt="Add Icon"
          />
          Add New
        </button>
      </div>

      <table className={styles.table4}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quantity</th>
            <th>Item Price</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.idStock}>
              <td>{stock.idStock}</td>
              <td>
                {editableStock?.idStock === stock.idStock ? (
                  <input
                    type="number"
                    value={stock.qte}
                    onChange={(e) => handleInputChange(e, "qte", stock)}
                  />
                ) : (
                  stock.qte
                )}
              </td>
              <td>
                {editableStock?.idStock === stock.idStock ? (
                  <input
                    type="number"
                    step="0.01"
                    value={stock.itemPrice}
                    onChange={(e) => handleInputChange(e, "itemPrice", stock)}
                  />
                ) : (
                  stock.itemPrice
                )}
              </td>
              <td>
                {editableStock?.idStock === stock.idStock ? (
                  <input
                    type="date"
                    value={stock.created_at}
                    onChange={(e) => handleInputChange(e, "created_at", stock)}
                  />
                ) : (
                  stock.created_at
                )}
              </td>
              <td>
                {editableStock?.idStock === stock.idStock ? (
                  <input
                    type="date"
                    value={stock.updated_at}
                    onChange={(e) => handleInputChange(e, "updated_at", stock)}
                  />
                ) : (
                  stock.updated_at
                )}
              </td>
              <td>
                {editableStock?.idStock === stock.idStock ? (
                  <button onClick={handleSave} className={styles.deletebutton}>
                    <img
                      className={styles.icondelete}
                      src={process.env.PUBLIC_URL + "/icons/tick.svg"}
                      alt="Save Icon"
                    />
                  </button>
                ) : (
                  <div className={styles.containerbutton}>
                    <button onClick={() => handleEdit(stock)}className={styles.deletebutton}>
                      <img
                        className={styles.icondelete}
                        src={process.env.PUBLIC_URL + "/icons/update.svg"}
                        alt="Update Icon"
                      />
                    </button>
                    <button onClick={() => handleDelete(stock.idStock)}className={styles.deletebutton}>
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

export default StockManagement;
