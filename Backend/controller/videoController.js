import Comment from "../modal/comment.js";
import Like from "../modal/Like.js";
import Video from "../modal/video.js";
// Add Video
export const addVideo = async (req, res) => {
  try {
    const { userId, url, platform, title, description } = req.body;
    const video = new Video({
      userId,
      url,
      platform,
      title,
      description,
    });
    const saveVideo = await video.save();
    res.status(201).json(saveVideo);
  } catch (error) {
    res.status(500).json({ message: "Error adding video" });
  }
};
// Get All Videos
export const getallVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate("userId", "name email");
    res.status(201).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Fetching video error" });
  }
};
// Get Video By ID
export const getvideoByID = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!video) return res.status(404).json({ message: "video not found" });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Fetching video error" });
  }
};
// Like/Unlike Video
export const toggleLikeVideo = async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOne({ videoId, userId });

    if (existingLike) {
      await Like.findOneAndDelete({ videoId, userId });
      await Video.findByIdAndUpdate(videoId, { $inc: { likesCount: -1 } });

      const updatedVideo = await Video.findById(videoId);

      return res.status(200).json({
        message: "Video unliked successfully",
        likesCount: updatedVideo.likesCount,
        liked: false,
      });
    } else {
      const newLike = new Like({ videoId, userId });
      await newLike.save();
      await Video.findByIdAndUpdate(videoId, { $inc: { likesCount: 1 } });

      const updatedVideo = await Video.findById(videoId);

      return res.status(200).json({
        message: "Video liked successfully",
        likesCount: updatedVideo.likesCount,
        liked: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Add Comment in video
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const newComment = new Comment({
      videoId,
      userId: req.user.id,
      text,
    });
    const saveComment = await newComment.save();
    await saveComment.populate('userId' , 'name')
    res.status(201).json(saveComment);
  } catch (error) {
    res.status(500).json({ message : 'Failed to add comment',error:message.error})
  }
};
// getcomments
export const getComment = async (req,res) => {
    try {
        const videoId = req.params.videoId;
        const comments = await Comment.find({videoId}).populate('userId','name').sort({createdAt:-1});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message:'Failed to fetch comment',error: error.message});
    }
}
