import Icon from "@mdi/react";
import {mdiHeartOutline, mdiCommentOutline, mdiShareOutline} from '@mdi/js';
import { formatDistanceToNow } from 'date-fns';

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
    comments: number;
}

const Post = (postInfo : PostProps) => {
    const {authorName, authorProfilePicture, createdAt, fishType, location, fishWeight, message, image, likes, comments} = postInfo;

    return <>
        <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex flex-row gap-2 h-15 items-center">
                <img src={authorProfilePicture} alt="Profile Picture" className="w-15 h-full object-cover rounded-full" />
                <span className="font-semibold">{authorName}</span>
                <span className="text-xs text-nowrap">{formatDistanceToNow(createdAt) + ' ago'}</span>
            </div>

            <div className="w-full h-100 bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={image} alt="Post" className="w-full h-full object-cover rounded-lg"/>
            </div>

            <div className="flex justify-between items-center mt-3 text-gray-700 text-sm font-semibold">
                <span>{fishType} - {fishWeight}kg</span>
                <span>{location}</span>
            </div>

            <p className="text-gray-600 text-sm mt-2 flex-grow text-ellipsis">{message}</p>

            <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                <button className="flex items-center space-x-1 hover:text-red-500">
                    <span>Like {likes}</span>
                    <Icon path={mdiHeartOutline} size={1}></Icon>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <span>Comment {comments}</span>
                    <Icon path={mdiCommentOutline} size={1}></Icon>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500">
                    <span>Share</span>
                    <Icon path={mdiShareOutline} size={1}></Icon>
                </button>
            </div>
        </div>
    </>
}
export default Post