// component/LikeButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FcLike } from 'react-icons/fc';
import { Like } from '../services/api';
import { toast } from "react-toastify";
import { useUserStore } from '../store/userStore';

const LikeButton = ({ videoId, isLiked, setLikeStatus, setVideo }) => {
  const token = useUserStore((state) => state.token);

  const handleLike = async () => {
    if (!token) {
      toast.info("Please login to like the video");
      return;
    }

    try {
      const res = await Like(videoId, token);
      const newIsLiked = res.liked;

      // Update like status for current video
      setLikeStatus((prev) => ({
        ...prev,
        [videoId]: newIsLiked,
      }));

      // Update likes count
      setVideo((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? { ...video, likesCount: res.likesCount }
            : video
        )
      );
    } catch (error) {
      console.error("Like Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button variant="light" className="border-0" onClick={handleLike}>
      <FcLike size={25} />
    </Button>
  );
};

export default LikeButton;
