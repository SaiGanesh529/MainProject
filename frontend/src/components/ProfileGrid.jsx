import React from 'react';
import { BsGrid3X3, BsBookmark, BsPersonBoundingBox } from "react-icons/bs";

const ProfileGrid = ({ posts }) => {
    const DEFAULT_POST = 'https://placehold.co/400';

    return (
        <div className="mt-2">
            {/* Tabs - Visual only for now */}
            <div className="flex justify-center gap-12 border-t border-gray-200 text-xs md:text-sm tracking-widest uppercase font-semibold text-gray-400">
                <div className="flex items-center gap-2 py-4 border-t border-black text-black -mt-[1px] cursor-pointer">
                    <BsGrid3X3 size={12} /> Posts
                </div>
                <div className="flex items-center gap-2 py-4 cursor-pointer hover:text-gray-600">
                    <BsBookmark size={12} /> Saved
                </div>
                <div className="flex items-center gap-2 py-4 cursor-pointer hover:text-gray-600">
                    <BsPersonBoundingBox size={14} /> Tagged
                </div>
            </div>

            {posts && posts.length > 0 ? (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {posts.map((post) => (
                        <div key={post.id || post.post_id} className="relative group cursor-pointer aspect-square overflow-hidden bg-gray-100">
                            <img
                                src={post.image || post.image_url || DEFAULT_POST}
                                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                                alt="Post"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DEFAULT_POST;
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white font-bold gap-6">
                                {/* Can add like/comment counts here if available in post object */}
                                {/* <span>❤️ {post.likes}</span> */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="flex justify-center mb-4 text-gray-800">
                        <div className="border-2 border-black rounded-full p-4">
                            <BsGrid3X3 size={32} />
                        </div>
                    </div>
                    <p className="text-2xl font-extrabold text-gray-800">No Posts Yet</p>
                </div>
            )}
        </div>
    );
};

export default ProfileGrid;
