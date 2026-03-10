import React, { useEffect, useState } from 'react';

const Stories = () => {
    const [stories, setStories] = useState([]);

    const fetchStories = async () => {
        try {
            const res = await fetch("/api/stories", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setStories(data.users_stories || []);
        } catch (error) {
            console.log('Error fetching stories:', error);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    return (
        <div className="flex flex-row space-x-4 py-4 mb-4 overflow-x-auto scrollbar-hide w-full max-w-[630px]">
            {stories.map((story) => (
                <div key={story.user_id} className="flex flex-col items-center cursor-pointer flex-shrink-0">
                    <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] rounded-full">
                        <div className="bg-white p-[2px] rounded-full">
                            <img
                                className="rounded-full h-16 w-16 object-cover"
                                src={story.story_url}
                                alt={story.user_name}
                            />
                        </div>
                    </div>
                    <p className="text-xs mt-1 text-gray-700 truncate w-16 text-center">
                        {story.user_name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Stories;
