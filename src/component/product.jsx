import React, { useEffect, useState } from "react";
import { Container, Table, Button, Card, Form, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import Sidebar from "./sidebar";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pd_id: "",
    pd_code: "",
    pd_name: "",
    pd_price: "",
    pd_ct_id: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setError(null);
    axios
      .get("http://localhost:5000/api/product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        setError("Terjadi kesalahan saat mengambil data produk.");
        console.error(error);
      });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      pd_id: "",
      pd_code: "",
      pd_name: "",
      pd_price: "",
      pd_ct_id: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/product", formData)
      .then((response) => {
        fetchProducts();
        handleCloseForm();
      })
      .catch((error) => {
        console.error("Gagal menambah produk", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      axios
        .delete(`http://localhost:5000/api/product/${id}`)
        .then(() => {
          fetchProducts();
        })
        .catch((error) => {
          console.error("Gagal menghapus produk", error);
        });
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#e3edf7" }}>
      <Sidebar />
      <Container fluid style={{ flex: 1, padding: "30px" }}>
        <Card
          className="shadow-lg border-0 p-4 animate__animated animate__fadeIn"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary fw-bold">📦 Daftar Produk</h2>
            <Button
              variant="success"
              className="fw-bold shadow-lg btn-lg"
              onClick={handleShowForm}
            >
              + Tambah Produk
            </Button>
          </div>

          {/* Show error if there's one */}
          {error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : (
            <Table striped bordered hover responsive className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Kode</th>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Category</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {product.length > 0 ? (
                  product.map((item) => (
                    <tr key={item._id}>
                      <td>{item.pd_id}</td>
                      <td>{item.pd_code}</td>
                      <td>{item.pd_name}</td>
                      <td>Rp. {item.pd_price.toLocaleString("id-ID")}</td>
                      <td>{item.pd_ct_id}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2 btn-action"
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="btn-action"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FaTrashCan />
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada data produk
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>

      {/* MODAL FORM */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID Produk</Form.Label>
              <Form.Control
                type="text"
                name="pd_id"
                value={formData.pd_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kode Produk</Form.Label>
              <Form.Control
                type="text"
                name="pd_code"
                value={formData.pd_code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                name="pd_name"
                value={formData.pd_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                name="pd_price"
                value={formData.pd_price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori ID</Form.Label>
              <Form.Control
                type="text"
                name="pd_ct_id"
                value={formData.pd_ct_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan Produk
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
