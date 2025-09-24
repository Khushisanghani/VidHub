import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { InstagramEmbed, YouTubeEmbed } from "@vip30/react-social-media-embed";
import { getAllVideos } from "../services/api";
import { FaCircleUser } from "react-icons/fa6";
import LikeButton from "../component/LikeButton";
import CommentBox from "../component/CommentBox";

const HomePage = () => {
  const [video, setVideo] = useState([]);
  const [likeStatus, setLikeStatus] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideo(data);
        const initialStatus = {};
        data.forEach((video) => {
          initialStatus[video._id] = false;
        });
        setLikeStatus(initialStatus);
      } catch (error) {
        console.error("Fetching video error", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <Container fluid className="mb-3">
        <Row className="justify-content-center mt-2">
          <Col md={11}>
            <div>
              <Row xs={1} md={2} lg={3} className="g-4 mt-3">
                {video.map((vd) => {
                  const isLiked = likeStatus[vd._id] || false;
                  const isYouTube =
                    vd.url.includes("youtube.com") ||
                    vd.url.includes("youtu.be");
                  const isInstagram = vd.url.includes("instagram.com");
                  const isFacebook = vd.url.includes("facebook.com");

                  return (
                    <Col key={vd._id}>
                      <Card className="h-100" border="secondary">
                        <Card.Body>
                          <p className="mb-2">
                            <FaCircleUser size={25} className="me-2" />
                            {vd.userId?.name}
                          </p>
                          <hr />
                          <p className="mb-2">{vd.description}</p>
                          <div>
                            {isYouTube && (
                              <YouTubeEmbed
                                url={vd.url}
                                width="100%"
                                height={300}
                              />
                            )}
                            {isInstagram && (
                              <InstagramEmbed
                                url={vd.url}
                                width="100%"
                                height={500}
                              />
                            )}
                            {isFacebook && (
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: 600,
                                }}
                              >
                                <iframe
                                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                                    vd.url
                                  )}&show_text=0&autoplay=0`}
                                  width="100%"
                                  height="100%"
                                  style={{
                                    border: "none",
                                    overflow: "hidden",
                                  }}
                                  allowFullScreen
                                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                ></iframe>
                              </div>
                            )}
                            {!isYouTube && !isInstagram && !isFacebook && (
                              <p>Video preview not available</p>
                            )}
                            <p>{vd.title}</p>
                            <p><b>Platform:</b>{vd.platform}</p>
                          </div>
                        </Card.Body>
                        <Card.Footer className="d-flex align-items-center gap-2">
                          <LikeButton
                            videoId={vd._id}
                            isLiked={isLiked}
                            setLikeStatus={setLikeStatus}
                            setVideo={setVideo}
                          />
                          <span className="pt-1" style={{ fontSize: "18px" }}>
                            {vd.likesCount}
                          </span>
                         <CommentBox videoId={vd._id} />
                         <span className="pt-1" style={{ fontSize: "18px" }}>{vd.comments}</span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
