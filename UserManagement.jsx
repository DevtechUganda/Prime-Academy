import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/admin/users").then(res => setUsers(res.data));
  }, []);
  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.active ? "Active" : "Suspended"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}