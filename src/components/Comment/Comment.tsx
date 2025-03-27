import { formatDistanceToNow } from "date-fns";

export type commentProps = {
    text: string;
    postedAt: Date;
    author: string;
    authorProfilePicture: string;
}

const Comment = (commentInfo: commentProps) => {
    const { text, postedAt, author, authorProfilePicture } = commentInfo;

    return <>
        <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex flex-row gap-2 h-15 items-center">
                <img src={authorProfilePicture} alt="Profile Picture" className="w-15 h-full object-cover rounded-full" />
                <span className="font-semibold">{author}</span>
                <span className="text-xs text-nowrap">{formatDistanceToNow(postedAt) + ' ago'}</span>
            </div>
            <p className="text-gray-600 text-sm mt-2 flex-grow text-ellipsis">{text}</p>
        </div>
    </>
}

export default Comment