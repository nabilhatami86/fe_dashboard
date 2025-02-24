import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful") {
        setError("");
        setSuccess("Login berhasil! Mengalihkan ke dashboard...");
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        setSuccess("");
        setError("Username atau password salah!");
      }
    } catch (error) {
      setSuccess("");
      setError("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f4f6f9" }}
    >
      <Card
        className="shadow-lg border-0 rounded-4 p-4"
        style={{ width: "400px" }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <FaUser size={50} className="text-primary" />
            <h2 className="fw-bold mt-2">Admin Login</h2>
          </div>

          {/* Alert Error & Success */}
          {error && (
            <Alert variant="danger" className="text-center fw-semibold">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="text-center fw-semibold">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3 text-start">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 text-start">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 fw-semibold rounded-3"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
