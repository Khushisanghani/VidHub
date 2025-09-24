import mongoose from 'mongoose';
const videoShema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    platform:{
        type:String,
        enum:['Youtube','Instagram','Facebook'],
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likesCount:{
        type:Number,
        default:0
    },
    commentsCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const Video = mongoose.model('Video',videoShema);
export default Video;