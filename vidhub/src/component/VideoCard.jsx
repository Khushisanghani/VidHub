import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { getAllVideos, } from "../services/api";
import { useVideoStore } from "../store/VideoStore";
import { FaSquareYoutube } from "react-icons/fa6";
import { FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { LuListVideo } from "react-icons/lu";
import {
  InstagramEmbed,
  YouTubeEmbed,
} from "@vip30/react-social-media-embed";
import LikeButton from "./LikeButton";
import CommentBox from "./CommentBox";

const VideoCard = () => {
  const [loading, setLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?._id;

  const videos = useVideoStore((state) => state.videos);
  const setVideos = useVideoStore((state) => state.addVideo);
  const clearVideos = useVideoStore((state) => state.clearVideos);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        const userVideos = data.filter((video) => {
          const vidUserId =
            typeof video.userId === "string" ? video.userId : video.userId?._id;
          return String(vidUserId) === String(userId);
        });

        clearVideos();
        userVideos.forEach(setVideos);

        const initialStatus = {};
        userVideos.forEach((video) => {
          initialStatus[video._id] = false;
        });
        setLikeStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [userId, setVideos, clearVideos]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading videos...</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <h4>No videos uploaded by you yet.</h4>
      </Container>
    );
  }
  
  
  return (
    <Container className="mt-4 mb-4">
      {/* <h3 className="text-center">Category</h3>
      <div className="text-center mb-4 d-flex justify-content-center gap-3">
        <FaSquareYoutube size={50} />
        <FaInstagramSquare size={50} />
        <FaFacebookSquare size={50} />
        <LuListVideo size={50} />
      </div>

      <hr /> */}
      {/* <h3 className="text-center">Videos</h3> */}

      <Row xs={1} md={2} lg={3} className="g-4">
        {videos.map((video) => {
          // console.log('video Url',video.url);
          const isLiked = likeStatus[video._id] || false;

          const isYouTube =
            video.url.includes("youtube.com") || video.url.includes("youtu.be");
          const isInstagram = video.url.includes("instagram.com");
          const isFacebook = video.url.includes("facebook.com");

          return (
            <Col key={video._id}>
              <Card className="h-100" border="secondary">
                <Card.Body>
                  <Card.Title><h3>{video.title}</h3></Card.Title>
                  

                  <div>
                    {isYouTube && (
                      <YouTubeEmbed url={video.url} width="100%" height={500} />
                    )}
                    {isInstagram && (
                      <InstagramEmbed
                        url={video.url}
                        width="100%"
                        height={500}
                      />
                    )}
                    {isFacebook && (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: 500,
                        }}
                      >
                        <iframe
                          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                            video.url
                          )}&show_text=0&autoplay=0`}
                          width="100%"
                          height="100%"
                          style={{ border: "none", overflow: "hidden" }}
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                      </div>
                    )}
                    {!isYouTube && !isInstagram && !isFacebook && (
                      <p>Video preview not available</p>
                    )}
                  </div>
                  <Card.Text className="mt-2">{video.description}</Card.Text>
                  <Card.Text>
                    <strong>Platform:</strong> {video.platform}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="d-flex align-items-cente gap-2">
                  <div className="d-flex align-items-center gap-3">
                  <LikeButton videoId={video._id} likeStatus={likeStatus} setLikeStatus={setLikeStatus}/>
                   <span className="pt-1" style={{ fontSize: '18px' }}>{video.likesCount}</span>
                   <CommentBox/>
                   </div>
                 
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default VideoCard;
 {/* <Button variant="light" className="border-0" disabled>
                    <FcComments size={30} />
                  </Button>
                  <span> {video.commentsCount || 0} </span> */}