import React from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

const AddVideo = () => {
  return (
    <>
      <Container>
        <h2 className="text-center mb-4 mt-4">Add Video</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description:</Form.Label>
            <Form.Control as={"textarea"} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Video Link:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <FloatingLabel label="Choose Platform">
            <Form.Select aria-label="Floating label select example">
              <option value="Youtube">Youtube</option>
              <option value="Instragram">Instragram</option>
              <option value="Facebook">Facebook</option>
            </Form.Select>
          </FloatingLabel>
          <div className="text-center mb-4 mt-4">
          <Button variant="success" >Upload Video</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddVideo;
