import React, { useEffect, useState } from "react";
import { Container, Table, Button, Card, Badge } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import Sidebar from "./sidebar";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/order")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus pesanan ini?")) {
      axios
        .delete(`http://localhost:5000/api/order/${id}`)
        .then(() => {
          fetchOrders();
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  console.log(orders);
  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "primary";
      case "shipped":
        return "warning";
      case "delivered":
        return "success";
      case "cancel":
        return "danger";
      default:
        return "secondary";
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
          <h2 className="text-primary fw-bold mb-4">📋 Daftar Pesanan</h2>

          {/* Tabel Pesanan */}
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>id</th>
                <th>Code</th>
                <th>Produk</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="table-row">
                    <td>{order.or_id}</td>
                    <td>{order.Product.pd_code}</td>
                    <td>{order.Product.pd_name}</td>
                    <td>{order.or_amount}</td>
                    <td>
                      <Badge
                        bg={getStatusVariant(order.or_status)}
                        className="status-badge"
                      >
                        {order.or_status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        className="btn-action"
                        onClick={() => handleDelete(order._id)}
                      >
                        <FaTrashCan /> Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada data pesanan
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>

      {/* Custom CSS */}
      <style>
        {`
          .table-dark th {
            background-color: #343a40 !important;
            color: white;
          }

          .shadow-lg {
            transition: all 0.3s ease-in-out;
          }

          .shadow-lg:hover {
            transform: scale(1.03);
          }

          .table-row:hover {
            background-color: rgba(0, 0, 0, 0.05);
            transition: 0.3s ease-in-out;
          }

          .btn-action {
            transition: all 0.3s ease-in-out;
          }

          .btn-action:hover {
            transform: translateY(-2px);
          }

          .status-badge {
            font-size: 0.9rem;
            padding: 6px 10px;
            border-radius: 10px;
            animation: pulse 1.5s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Orders;
