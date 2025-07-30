import React from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const Navigate = useNavigate();
    const handleClick = () => {
        Navigate("/Login");
    }
  return (
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="p-4 shadow rounded bg-white" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Register Form</h3>
        <Form>
           <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Name</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Email</Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                name="email"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                name="password"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Confirm Password</Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                name="cpassword"
              />
            </Col>
          </Form.Group>
          <div className="text-center">
            <Button variant="primary"  onClick={() => handleClick()}>Register</Button>
          </div>
        </Form>
      </Container>
      </div>
    </>
  )
}

export default Register
