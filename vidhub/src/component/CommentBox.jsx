import React, { useState } from "react";
import { Button, Form, Modal} from "react-bootstrap";
import { FcComments } from "react-icons/fc";
import { useCommentStore } from "../store/CommentStore";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]); 
  const [show, setShow] = useState(false);
  const comments = useCommentStore((state)=> state.comments);
  const addcomment = useCommentStore((state) => state.addcomment);
  const clearcomment = useCommentStore((state) => state.clearcomment);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(comment.trim()){
      addcomment(comment.trim())
      setComment(""); 
    }
    // setComments((prevComments) => [...prevComments, comment]);
    
  };

  return (
    <>
      <Button variant="light" className="border-0 position-relative" onClick={handleShow}>
        <FcComments size={30} /> 
      </Button>
        <span className="pt-1" style={{ fontSize: '18px' }}>0</span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Write Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>

          <hr />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Add Comment
          </Button>
        </Modal.Footer>
        <hr/>
        <div className="p-2">
            {comments.map((com, index) => (
              <div key={index} className="mb-2 p-2 bg-light border rounded">
                {com}
              </div>
            ))}
          </div>
      </Modal>
    </>
  );
};

export default CommentBox;
