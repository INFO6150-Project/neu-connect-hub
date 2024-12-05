import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import api from "../../utils/api";
import { setAlert } from "../../actions/alert";
import "./AdminDashboard.css";

const AdminDashboard = ({ setAlert }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        setAlert("Failed to fetch users", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setAlert]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.role && user.role.toLowerCase().includes(query))
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    try {
      await api.put(`/admin/users/${editingUser._id}`, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      });
      setAlert("User updated successfully!", "success");
      setEditingUser(null);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? { ...user, ...editingUser } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? { ...user, ...editingUser } : user
        )
      );
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      setAlert("Failed to update user", "danger");
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    try {
      const res = await api.delete(`/admin/users/${deletingUser._id}`);
      setAlert(res.data.msg || "User deleted successfully!", "success");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deletingUser._id));
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== deletingUser._id)
      );
      setDeletingUser(null);
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      setAlert(err.response?.data?.msg || "Failed to delete user", "danger");
    }
  };

  if (loading) {
    return <h2 className="loading-text">Loading...</h2>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-container">
        <section className="dashboard-content">
          <h2 className="admin-dashboard-title">Registered Users</h2>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, or role"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role || "User"}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => setDeletingUser(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-users">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Apple-style Edit Modal */}
        {editingUser && (
          <div className="apple-modal-backdrop">
            <div className="apple-modal">
              <div className="apple-modal-content">
                <h3>Edit User</h3>
                <div className="apple-form-field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingUser.name || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="apple-input"
                    placeholder="Enter name"
                  />
                </div>
                <div className="apple-form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="apple-input"
                    placeholder="Enter email"
                  />
                </div>
                <div className="apple-form-field">
                  <label>Role</label>
                  <select
                    name="role"
                    value={editingUser.role || "user"}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="apple-select"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="apple-modal-actions">
                  <button
                    className="apple-btn apple-btn-secondary"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="apple-btn apple-btn-primary"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apple-style Delete Modal */}
        {deletingUser && (
          <div className="apple-modal-backdrop">
            <div className="apple-modal">
              <div className="apple-modal-content">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete user {deletingUser.name}?</p>
                <p className="apple-modal-subtitle">This action cannot be undone.</p>
                <div className="apple-modal-actions">
                  <button
                    className="apple-btn apple-btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="apple-btn apple-btn-secondary"
                    onClick={() => setDeletingUser(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(AdminDashboard);