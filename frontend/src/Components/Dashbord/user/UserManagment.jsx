import React, { useState } from 'react';
import styles from "./User.module.css"


const UserManagment = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ]);

  const [editableUser, setEditableUser] = useState(null);

  const handleEdit = (user) => {
    setEditableUser(user);
  };

  const handleSave = () => {
    setEditableUser(null);
  };

  const handleDelete = (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
  };

  const handleInputChange = (e, field, user) => {
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, [field]: e.target.value };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const handleAddRow = () => {
    const newId = Math.max(...users.map((user) => user.id)) + 1;
    const newUser = { id: newId, name: '', email: '' };
    setUsers([...users, newUser]);
    setEditableUser(newUser);
  };

  return (
    <div className={styles.div5}>
      <div className={styles.container5}>
        <h2>User Management</h2>
        <button onClick={handleAddRow} className={styles.button5}>
          <img className={styles.icon} src={process.env.PUBLIC_URL + './icons/add.svg'} alt="Save Icon" />
          Add New
        </button>
      </div>

      <table className={styles.table5}>
      <colgroup>
      <col style={{ width: '10%' }} />
    <col style={{ width: '30%' }} />
    <col style={{ width: '30%' }} />
    <col style={{ width: '30%' }} />
  </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editableUser?.id === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange(e, 'name', user)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editableUser?.id === user.id ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, 'email', user)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editableUser?.id === user.id ? (
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) => handleInputChange(e, 'password', user)}
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                {editableUser?.id === user.id ? (
                  <button onClick={handleSave} className={styles.deletebutton }>
                    <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/tick.svg'} alt="Save Icon" />
                  </button>
                ) : (
                  <div className={styles.buttonContainer}>
                    <button onClick={() => handleEdit(user)} className={styles.deletebutton }>
                      <img className={styles.icondelete} src={process.env.PUBLIC_URL + '/icons/update.svg'} alt="Update Icon" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className={styles.deletebutton }>
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

export default UserManagment;