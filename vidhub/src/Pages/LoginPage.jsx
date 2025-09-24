import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; 
import { useUserStore } from '../store/userStore';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 
  const login = useUserStore((state) => state.login);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginData);
      const { token, user } = res.data;
      const userId = user._id;

      if (!userId) {
        alert("User ID not found");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", userId);

      login(user, token);

      alert("Login successful!");
      navigate('/');
    } catch (error) {
      alert(error?.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center vh-50 pt-5">
      <Container className="p-4 shadow rounded bg-success bg-opacity-25" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Login Form</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Col sm="12">
              <Form.Control
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder='Email'
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm="12">
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit">Login</Button>
          </div>

          <p className="text-center mt-3">
            Don't have an account? <NavLink to="/register">Register Here</NavLink>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
