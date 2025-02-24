import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Sidebar from "../../component/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [data, setData] = useState({ totalUsers: 0, totalProducts: 0 });
  const [prevData, setPrevData] = useState({ totalUsers: 0, totalProducts: 0 });
  const [pendapatan, setPendapatan] = useState({ total_revenue: "Rp 0" });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/admin/dashboard")
      .then((response) => {
        console.log("API Response Dashboard:", response.data);
        setPrevData(data);
        setData(response.data);
        setLastUpdated(new Date().toLocaleString()); // Simpan waktu terakhir update
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setError("Gagal memuat data dashboard! Periksa koneksi API.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data/dummy/revenue")
      .then((response) => {
        console.log("API Response Revenue:", response.data);
        setPendapatan(response.data || { total_revenue: "Rp 0" });
      })
      .catch((error) => console.error("Error fetching revenue data:", error));
  }, []);

  const userChange = data.totalUsers - prevData.totalUsers;
  const productChange = data.totalProducts - prevData.totalProducts;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      <Sidebar />
      <Container fluid style={{ flex: 1, padding: "30px" }}>
        <Row className="mb-4">
          <Col>
            <h2 className="text-primary fw-bold">Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>

        {/* Loading */}
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Memuat data...</p>
          </div>
        ) : (
          <>
            {/* Kartu Statistik */}
            <Row className="g-4">
              <Col md={4}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="text-center">
                    <FaUsers size={40} className="text-primary mb-3" />
                    <Card.Title className="fw-semibold">
                      Total Pengguna
                    </Card.Title>
                    <h4 className="fw-bold text-dark">{data.totalUsers}</h4>
                    <Button variant="primary" className="mt-2 w-100">
                      Lihat Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="text-center">
                    <FaShoppingCart size={40} className="text-success mb-3" />
                    <Card.Title className="fw-semibold">
                      Total Produk
                    </Card.Title>
                    <h4 className="fw-bold text-dark">{data.totalProducts}</h4>
                    <Button variant="success" className="mt-2 w-100">
                      Lihat Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="text-center">
                    <MdAttachMoney size={40} className="text-info mb-3" />
                    <Card.Title className="fw-semibold">
                      Total Pendapatan
                    </Card.Title>
                    <h4 className="fw-bold text-dark">
                      {pendapatan?.total_revenue || "Rp 0"}
                    </h4>
                    <Button variant="info" className="mt-2 w-100">
                      Lihat Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Statistik Perubahan Data */}
            <Row className="mt-4">
              <Col>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      Statistik Perubahan Data
                    </Card.Title>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Statistik</th>
                          <th>Total Sekarang</th>
                          <th>Perubahan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Total Pengguna</td>
                          <td>{data.totalUsers}</td>
                          <td>
                            {userChange > 0 ? (
                              <span className="text-success">
                                +{userChange}
                              </span>
                            ) : userChange < 0 ? (
                              <span className="text-danger">{userChange}</span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Total Produk</td>
                          <td>{data.totalProducts}</td>
                          <td>
                            {productChange > 0 ? (
                              <span className="text-success">
                                +{productChange}
                              </span>
                            ) : productChange < 0 ? (
                              <span className="text-danger">
                                {productChange}
                              </span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Total Pendapatan</td>
                          <td>{pendapatan?.total_revenue || "Rp 0"}</td>
                          <td>
                            <span className="text-muted">-</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <p className="text-muted text-end mt-3">
                      Terakhir diperbarui: {lastUpdated}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
