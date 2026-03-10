import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane, FaRegBookmark } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false); // You might want to initialize this from props if backend sends 'liked_by_me'
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState(post.comments || []);

    const toggleLike = async () => {
        // Optimistic update
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);

        try {
            await fetch(`/api/posts/${post.post_id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            });
            // If error, revert state (not implemented for brevity)
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        try {
            const res = await fetch(`/api/posts/${post.post_id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                },
                body: JSON.stringify({ comment: commentInput.trim() })
            });

            if (res.ok) {
                // Optimistically add comment or refetch. 
                // For now, let's just create a dummy comment object to append
                // Ideally backend returns the created comment structure
                const newComment = {
                    user_name: 'Me', // We don't have current user name easily unless stored
                    comment: commentInput.trim()
                };
                setComments([...comments, newComment]);
                setCommentInput('');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 md:border md:rounded-lg mb-4 text-sm w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                    <Link to={`/IndividualProfiles/${post.user_id}`}>
                        <img
                            src={post.profile_pic}
                            alt={post.user_name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                    </Link>

                    <Link to={`/IndividualProfiles/${post.user_id}`} className="font-semibold text-gray-900 hover:text-gray-600">
                        {post.user_name}
                    </Link>
                    <span className="text-gray-500">• {post.created_at}</span>
                </div>
                <button className="text-gray-900">
                    <BsThreeDots />
                </button>
            </div>

            {/* Image */}
            <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                    src={post.post_details.image_url || "https://placehold.co/600x400"}
                    alt="Post Content"
                    className="w-full h-auto object-cover max-h-[600px]"
                />
            </div>

            {/* Actions */}
            <div className="p-3 pb-1">
                <div className="flex justify-between items-center text-2xl">
                    <div className="flex gap-4">
                        <button onClick={toggleLike} className="hover:opacity-60">
                            {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                        </button>
                        <button className="hover:opacity-60">
                            <FaRegComment className="-scale-x-100" />
                        </button>
                        <button className="hover:opacity-60">
                            <FaRegPaperPlane />
                        </button>
                    </div>
                    <button className="hover:opacity-60">
                        <FaRegBookmark />
                    </button>
                </div>
                {/* Likes count */}
                <div className="font-semibold mt-2 text-sm">{likesCount.toLocaleString()} likes</div>
            </div>

            {/* Caption & Comments */}
            <div className="px-3 pb-2">
                <div className="mb-1">
                    <span className="font-semibold mr-2">{post.user_name}</span>
                    <span>{post.post_details.caption}</span>
                </div>

                {comments.length > 0 && (
                    <button className="text-gray-500 text-sm mt-1 mb-1">
                        View all {comments.length} comments
                    </button>
                )}

                <div className="space-y-1">
                    {comments.slice(-2).map((c, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="font-semibold">{c.user_name}</span>
                            <span>{c.comment}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex items-center px-3 py-3 border-t border-gray-100 mt-2">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 outline-none text-sm placeholder-gray-500"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
                {commentInput && (
                    <button type="submit" className="text-blue-500 font-semibold text-sm ml-2">Post</button>
                )}
            </form>

        </div>
    );
};

export default PostItem;
