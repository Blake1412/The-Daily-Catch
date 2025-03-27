import Icon from "@mdi/react";
import { mdiHeartOutline, mdiCommentOutline, mdiShareOutline, mdiHeart, mdiComment } from '@mdi/js';
import { formatDistanceToNow } from 'date-fns';
import { commentProps } from "../Comment/Comment";
import Comment from "../Comment/Comment";
import { useState } from "react";

export type PostProps = {
    authorName: string;
    authorProfilePicture: string;
    createdAt: Date;
    fishType: string;
    location: string;
    fishWeight: number;
    message: string;
    image: string;
    likes: number;
    userLiked: boolean;
    comments: commentProps[];
}

const Post = (postInfo: PostProps) => {
    const { authorName, authorProfilePicture, createdAt, fishType, location, fishWeight, message, image, likes, userLiked, comments } = postInfo;

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [likesCount, setLikesCount] = useState(likes)
    const [isLiked, setIsLiked] = useState(userLiked)

    const toggleComments = () => {
        setIsCommentsOpen(!isCommentsOpen)
    }

    const toggleLiked = () => {
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
        setIsLiked(!isLiked)
    }

    return <>
        <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex flex-row gap-2 h-15 items-center">
                <img src={authorProfilePicture} alt="Profile Picture" className="w-15 h-full object-cover rounded-full" />
                <span className="font-semibold">{authorName}</span>
                <span className="text-xs text-nowrap">{formatDistanceToNow(createdAt) + ' ago'}</span>
            </div>

            <div className="w-full h-100 bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={image} alt="Post" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="flex justify-between items-center mt-3 text-gray-700 text-sm font-semibold">
                <span>{fishType} - {fishWeight}kg</span>
                <span>{location}</span>
            </div>

            <p className="text-gray-600 text-sm mt-2 flex-grow text-ellipsis">{message}</p>

            <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                <button className="flex items-center space-x-1 hover:text-red-500 cursor-pointer" onClick={toggleLiked}>
                    <span>Like {likesCount}</span>
                    <Icon path={isLiked ? mdiHeart : mdiHeartOutline} color={'red'} size={1}></Icon>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer" onClick={toggleComments}>
                    <span>Comment {comments.length >= 1 ? comments.length : null}</span>
                    <Icon path={isCommentsOpen ? mdiComment : mdiCommentOutline} color={'#42A5F5'} size={1}></Icon>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500 cursor-pointer">
                    <span>Share</span>
                    <Icon path={mdiShareOutline} color={'green'} size={1}></Icon>
                </button>
            </div >
            {isCommentsOpen && <div className="flex flex-col w-full max-w-md gap-5">
                {comments.map((commentInfo) => (
                    <Comment {...commentInfo} ></Comment>
                ))}
            </div>}

        </div>
    </>
}
export default Post