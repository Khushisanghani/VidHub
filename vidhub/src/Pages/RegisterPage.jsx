import { useState } from 'react';
import React from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { registerUser } from '../services/api'; 
import { NavLink, useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.cpassword,
      });

      alert("User register successfully"); 
      Navigate('/login');
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="d-flex justify-content-center vh-50 pt-5">
      <Container className="p-4 shadow rounded bg-success bg-opacity-25" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Create Your Account</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group  className="mb-3">
            <Col sm="12">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Name'
                required
              />
            </Col>
          </Form.Group>
          <Form.Group  className="mb-3">
            <Col sm="12">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                required
              />
            </Col>
          </Form.Group>
          <Form.Group  className="mb-3">
            <Col sm="12">
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
            </Col>
          </Form.Group>
          <Form.Group  className="mb-3">
            <Col sm="12">
              <Form.Control
                type="password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                placeholder='Confirm Password'
                required
              />
            </Col>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="success">Register</Button>
          </div>
          <p className="text-center mt-3">
              Already have an account? <NavLink to="/login"> Login</NavLink>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
