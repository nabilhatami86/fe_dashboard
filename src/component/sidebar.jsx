import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Nav, Navbar, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [adminName, setAdminName] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedName = localStorage.getItem("adminName") || "Admin";
    setAdminName(storedName);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Navbar
        bg="dark"
        variant="dark"
        className={`d-flex flex-column justify-content-between shadow-lg sidebar ${
          isCollapsed ? "collapsed" : ""
        }`}
        style={{
          width: isCollapsed ? "80px" : "280px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          background: "linear-gradient(135deg, #2b5876, #4e4376)",
          color: "white",
          overflowY: "auto",
          padding: "20px",
          zIndex: 1000,
          transition: "width 0.3s ease-in-out",
        }}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        {/* Profile Admin */}
        <div className="text-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYwM33sSN7MtnLIq0k1qjhpoEtSstLE26gA&s"
            roundedCircle
            className="mb-3 border border-light"
            style={{
              width: isCollapsed ? "40px" : "80px",
              height: isCollapsed ? "40px" : "80px",
              transition: "all 0.3s ease",
            }}
          />
          {!isCollapsed && (
            <>
              <h5>{adminName}</h5>
              <small className="text-white-50">Administrator</small>
            </>
          )}
        </div>

        {/* Menu Navigasi */}
        <Nav className="flex-column w-100 mt-4">
          {[
            { path: "/dashboard", icon: <FaHome />, label: "Home" },
            { path: "/user", icon: <FaUsers />, label: "Users" },
            { path: "/product", icon: <FaBox />, label: "Products" },
            { path: "/order", icon: <FaShoppingCart />, label: "Orders" },
          ].map((item) => (
            <Nav.Link
              key={item.path}
              href={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              style={{ paddingLeft: isCollapsed ? "10px" : "20px" }}
            >
              {item.icon}
              {!isCollapsed && <span className="ms-3">{item.label}</span>}
            </Nav.Link>
          ))}
        </Nav>

        {/* Bagian Logout */}
        <Nav className="flex-column w-100">
          <Nav.Link className="sidebar-link">
            <FaUser className="me-3" /> {!isCollapsed && "Profile"}
          </Nav.Link>
          <Nav.Link
            href="/login"
            className="sidebar-link"
            onClick={() => navigate("/login")}
          >
            <FaSignOutAlt className="me-3" /> {!isCollapsed && "Logout"}
          </Nav.Link>
        </Nav>

        {/* Footer */}
        {!isCollapsed && (
          <div
            className="text-center mt-4 text-white-50"
            style={{ fontSize: "12px" }}
          >
            © 2025 Admin Panel
          </div>
        )}
      </Navbar>

      {/* Konten Utama */}
      <main
        style={{
          flexGrow: 1,
          padding: "20px",
          marginLeft: isCollapsed ? "80px" : "280px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {children}
      </main>

      {/* Custom CSS */}
      <style>
        {`
          .sidebar-link {
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 16px;
            display: flex;
            align-items: center;
            transition: all 0.3s ease-in-out;
          }
          .sidebar-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(5px);
          }
          .sidebar-link:focus, .sidebar-link:active {
            background: rgba(255, 255, 255, 0.3);
          }
          .sidebar-link.active {
            background: rgba(255, 255, 255, 0.4);
            border-left: 4px solid white;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
