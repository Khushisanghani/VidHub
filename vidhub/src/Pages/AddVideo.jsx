import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { addVideo } from "../services/api";
import { useVideoStore } from "../store/VideoStore";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const AddVideo = () => {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    url: '',
    platform: 'Youtube',
  });
  const addVideoToStore = useVideoStore((state) => state.addVideo); 
 const navigate = useNavigate();
  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userId = localStorage.getItem('userId');
    if (!userId) {
      const user = JSON.parse(localStorage.getItem('user'));
      userId = user?._id;
    }

    if (!userId) {
      alert("User not Logged In");
      return;
    }

    try {
      const video = { ...videoData, userId };
      const response = await addVideo(video);

      addVideoToStore(response);

      alert("Video uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload error");
    }

    setVideoData({ title: '', description: '', url: '', platform: 'Youtube' });
  };

  return (
    <Container>
      <h2 className="text-center mb-4 mt-4">Add Video</h2>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="title" value={videoData.title} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description:</Form.Label>
          <Form.Control as={"textarea"} onChange={handleChange} name="description" value={videoData.description} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Video Link:</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="url" value={videoData.url} />
        </Form.Group>
        <FloatingLabel label="Choose Platform" className="mb-3">
          <Form.Select onChange={handleChange} name="platform" value={videoData.platform}>
            <option value="Youtube">Youtube</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
          </Form.Select>
        </FloatingLabel>
       <div className="d-flex justify-content-center gap-3 mb-4 mt-4">
  <Button variant="outline-dark" type="submit">
    <FaCloudUploadAlt size={25} /> Upload Video
  </Button>
  <Button variant="outline-dark" onClick={() => navigate("/profile")}>
    Show Video
  </Button>
</div>
      </Form>
    </Container>
  );
};

export default AddVideo;
