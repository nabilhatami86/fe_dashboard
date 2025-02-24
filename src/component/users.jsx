import React, { useEffect, useState } from "react";
import { Table, Container, Button, Card, Form } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import Sidebar from "./sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    us_id: "",
    us_name: "",
    us_password: "",
    us_email: "",
    us_phone_number: "",
    us_address: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/user")
      .then((response) => setUsers(response.data))
      .catch((error) =>
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error)
      );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.us_id || !formData.us_name || !formData.us_email) {
      alert("ID, Nama, dan Email harus diisi!");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const newUser = {
      ...formData,
      us_created_at: currentDate,
      us_updated_at: currentDate,
    };

    axios
      .post("http://localhost:5000/api/user", newUser)
      .then(() => {
        alert("Pengguna berhasil ditambahkan!");
        fetchUsers();
        setFormData({
          us_id: "",
          us_name: "",
          us_password: "",
          us_email: "",
          us_phone_number: "",
          us_address: "",
        });
        setShowForm(false);
      })
      .catch((error) =>
        console.error("Terjadi kesalahan saat menambahkan pengguna:", error)
      );
  };

  return (
    <div className="main-container">
      <Sidebar />
      <Container fluid className="content-container">
        <Card className="user-card">
          <div className="header">
            <h2 className="title">👥 Daftar Pengguna</h2>
            <Button
              variant="success"
              className="add-button"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "✖ Tutup Form" : "+ Tambah Pengguna"}
            </Button>
          </div>

          {/* Form Tambah Pengguna */}
          {showForm && (
            <Form className="user-form" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="ID Pengguna"
                name="us_id"
                value={formData.us_id}
                onChange={handleChange}
                required
              />
              <Form.Control
                type="text"
                placeholder="Nama"
                name="us_name"
                value={formData.us_name}
                onChange={handleChange}
                required
              />
              <Form.Control
                type="password"
                placeholder="Password"
                name="us_password"
                value={formData.us_password}
                onChange={handleChange}
              />
              <Form.Control
                type="email"
                placeholder="Email"
                name="us_email"
                value={formData.us_email}
                onChange={handleChange}
                required
              />
              <Form.Control
                type="text"
                placeholder="Nomor Telepon"
                name="us_phone_number"
                value={formData.us_phone_number}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Alamat"
                name="us_address"
                value={formData.us_address}
                onChange={handleChange}
              />
              <Button type="submit" variant="primary" className="save-button">
                ✅ Simpan Pengguna
              </Button>
            </Form>
          )}

          {/* Tabel Pengguna */}
          <Table striped bordered hover responsive className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Telepon</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.us_id}</td>
                  <td>{user.us_name}</td>
                  <td>{user.us_email}</td>
                  <td>{user.us_phone_number}</td>
                  <td>{user.us_address}</td>
                  <td>
                    <Button variant="dark" size="sm" className="action-button">
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="action-button"
                    >
                      <FaTrashCan /> Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>

      {/* Custom CSS */}
      <style>
        {`
          .main-container {
            display: flex;
            min-height: 100vh;
            background: #f4f7fc;
          }

          .content-container {
            flex: 1;
            padding: 30px;
          }

          .user-card {
            padding: 20px;
            border-radius: 15px;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .title {
            color: #0056b3;
            font-weight: bold;
          }

          .user-form {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
            background: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .user-form input {
            padding: 8px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          .save-button {
            grid-column: span 3;
            font-weight: bold;
            background: #007bff;
            box-shadow: 0 3px 10px rgba(0, 123, 255, 0.2);
          }

          .user-table thead {
            background-color: #343a40;
            color: white;
          }

          .user-table tbody tr:hover {
            background-color: rgba(0, 0, 0, 0.05);
            transition: 0.3s ease-in-out;
          }

          .action-button {
            margin: 3px;
            transition: all 0.3s ease-in-out;
          }

          .action-button:hover {
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .user-form {
              grid-template-columns: repeat(2, 1fr);
            }
            .save-button {
              grid-column: span 2;
            }
          }

          @media (max-width: 500px) {
            .user-form {
              grid-template-columns: 1fr;
            }
            .save-button {
              grid-column: span 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Users;
