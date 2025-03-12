import {PostProps} from "../components/Post/Post";
import Post from "../components/Post/Post";

const ThreadPage = ({posts}: { posts: PostProps[] }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center overflow-y-auto h-screen">
                <div className="flex flex-col w-full max-w-md gap-20">
                    {posts.map((postInfo) => (
                        <Post {...postInfo} ></Post>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ThreadPage;