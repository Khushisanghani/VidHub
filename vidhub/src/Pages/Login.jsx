import React from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import { NavLink } from 'react-router-dom'
const Login = () => {
  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="p-4 shadow rounded bg-white" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Login Form</h3>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Email</Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="email"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                name="password"
                required
              />
            </Col>
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">Login</Button>
          </div>
          <p className="text-center mt-3">
            Don't have an account? <NavLink to="/register">Register Here</NavLink>
          </p>
        </Form>
        </Container>
        </div>
    </>
  )
}

export default Login
