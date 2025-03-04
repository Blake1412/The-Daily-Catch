'use client';

import React, { useState, useEffect } from 'react';

const Post: React.FC = () => {
    const [isClient, setIsClient] = useState(false);  // Ensures content is only rendered client-side

    useEffect(() => {
        setIsClient(true);  // Set to true once component mounts
    }, []);

    if (!isClient) {
        return null;  // Prevent rendering until client-side
    }

    return (
        <div className="bg-[#F2F2F2] rounded-lg shadow-lg p-4 mb-6 max-w-4xl mx-auto">
            <img src="/img/post-image.jpg" alt="Post" className="w-full h-auto rounded-md" />
            <p className="mt-4 text-lg text-[#333333]">Look at this trout I caught! :)</p>
        </div>
    );
};

export default Post;
