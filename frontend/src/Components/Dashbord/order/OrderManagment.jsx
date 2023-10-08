import React, { useState } from "react";
import styles from "./Order.module.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      idOrder: 1,
      cltFullName: "John Doe",
      email: "john@example.com",
      cltPhone: 123456789,
      deliveryAddressOne: "Address 1",
      deliveryAddressTwo: "Address 2",
      status: 1,
      created_at: "2023-05-01",
      updated_at: "2023-05-02",
    },
    {
      idOrder: 2,
      cltFullName: "Jane Smith",
      email: "jane@example.com",
      cltPhone: 987654321,
      deliveryAddressOne: "Address 3",
      deliveryAddressTwo: "Address 4",
      status: 2,
      created_at: "2023-05-03",
      updated_at: "2023-05-04",
    },
    // Add more orders as needed
  ]);

  const [editableOrder, setEditableOrder] = useState(null);

  const handleEdit = (order) => {
    setEditableOrder(order);
  };

  const handleSave = () => {
    setEditableOrder(null);
  };

  const handleDelete = (orderId) => {
    const filteredOrders = orders.filter((order) => order.idOrder !== orderId);
    setOrders(filteredOrders);
  };

  const handleInputChange = (e, field, order) => {
    const updatedOrders = orders.map((o) => {
      if (o.idOrder === order.idOrder) {
        return { ...o, [field]: e.target.value };
      }
      return o;
    });
    setOrders(updatedOrders);
  };

  const handleAddRow = () => {
    const newId = Math.max(...orders.map((order) => order.idOrder)) + 1;
    const newOrder = {
      idOrder: newId,
      cltFullName: "",
      email: "",
      cltPhone: "",
      deliveryAddressOne: "",
      deliveryAddressTwo: "",
      status: "",
      created_at: "",
      updated_at: "",
    };
    setOrders([...orders, newOrder]);
    setEditableOrder(newOrder);
  };

  return (
    <div className={styles.div4}>
      <div className={styles.container4}>
        <h2>Order Management</h2>
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
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delivery Address 1</th>
            <th>Delivery Address 2</th>
            <th>Status</th>
            <th>CreatedAt</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.idOrder}>
              <td>{order.idOrder}</td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.cltFullName}
                    onChange={(e) => handleInputChange(e, "cltFullName", order)}
                  />
                ) : (
                  order.cltFullName
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="email"
                    value={order.email}
                    onChange={(e) => handleInputChange(e, "email", order)}
                  />
                ) : (
                  order.email
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.cltPhone}
                    onChange={(e) => handleInputChange(e, "cltPhone", order)}
                  />
                ) : (
                  order.cltPhone
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.deliveryAddressOne}
                    onChange={(e) =>
                      handleInputChange(e, "deliveryAddressOne", order)
                    }
                  />
                ) : (
                  order.deliveryAddressOne
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.deliveryAddressTwo}
                    onChange={(e) =>
                      handleInputChange(e, "deliveryAddressTwo", order)
                    }
                  />
                ) : (
                  order.deliveryAddressTwo
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.status}
                    onChange={(e) => handleInputChange(e, "status", order)}
                  />
                ) : (
                  order.status
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.created_at}
                    onChange={(e) => handleInputChange(e, "created_at", order)}
                  />
                ) : (
                  order.created_at
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <input
                    type="text"
                    value={order.updated_at}
                    onChange={(e) => handleInputChange(e, "updated_at", order)}
                  />
                ) : (
                  order.updated_at
                )}
              </td>
              <td>
                {editableOrder?.idOrder === order.idOrder ? (
                  <button onClick={handleSave} className={styles.deletebutton}>
                    <img
                      className={styles.icondelete}
                      src={process.env.PUBLIC_URL + "/icons/tick.svg"}
                      alt="Save Icon"
                    />
                  </button>
                ) : (
                  <div className={styles.buttonContainer }>
                    <button onClick={() => handleEdit(order)} className={styles.deletebutton}>
                      <img
                        className={styles.icondelete}
                        src={process.env.PUBLIC_URL + "/icons/update.svg"}
                        alt="Update Icon"
                      />
                    </button>
                    <button onClick={() => handleDelete(order.idOrder)} className={styles.deletebutton}>
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

export default OrderManagement;
