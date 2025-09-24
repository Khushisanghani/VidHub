import express from 'express';
import { addComment, addVideo, getallVideo, getComment, getvideoByID, toggleLikeVideo } from '../controller/videoController.js';
import verifyToken from '../middleware/verifyToken.js';
const videoRoute = express.Router();
videoRoute.post('/',addVideo);
videoRoute.get('/',getallVideo);
videoRoute.get('/:id',getvideoByID);
// like video
videoRoute.post('/like', verifyToken, toggleLikeVideo);
// add comment
videoRoute.post('/comment',verifyToken,addComment);
// get comment
videoRoute.get('/comment/:videoId',getComment);
export default videoRoute;