import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import profile from "../assets/home_img.jpg"
import { useUserStore } from "../store/userStore";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import VideoCard from "./VideoCard";
const Profile = () => {
  const navigate = useNavigate();
 const user = useUserStore((state) => state.user);
  return (
    <Container className="mt-2">
      <div>
        <Button onClick={() => navigate("/")} variant="dark" className="mb-3">
          <FaArrowLeft size={20} />
        </Button>

        <Row className="justify-content-center">
          <Col xs="auto" className="d-flex flex-column align-items-center">
            <Image
              src={profile}
              roundedCircle
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h3 className="mt-3 text-center">{user ? user.name : "Unknown"}</h3>
          </Col>
        </Row>
            <hr/>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-dark" onClick={() => navigate("/addvideo")}>
              <AiOutlineVideoCameraAdd size={25} /> Add Video
            </Button>
          </Col>
          <VideoCard/>
        </Row>
      </div>
    </Container>
  );
};

export default Profile;
