import React from 'react';

const ProfileHeader = ({ user, actions }) => {
    const DEFAULT_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 px-4 py-8 border-b border-gray-200">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <img
                    src={user.profile_pic || DEFAULT_AVATAR}
                    alt={user.user_name}
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_AVATAR;
                    }}
                />
            </div>

            {/* Info */}
            <div className="flex-1 w-full md:w-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h2 className="text-xl md:text-2xl font-light">{user.user_name}</h2>
                    <div className="flex gap-2">
                        {actions}
                    </div>
                </div>

                {/* Stats - Hidden on mobile usually, but keeping for simplicity or adapting */}
                <div className="flex justify-around md:justify-start md:gap-10 text-base mb-4 border-t border-gray-100 md:border-none py-3 md:py-0">
                    <div className="text-center md:text-left">
                        <span className="font-semibold block md:inline">{user.posts_count || 0}</span> posts
                    </div>
                    <div className="text-center md:text-left">
                        <span className="font-semibold block md:inline">{user.followers_count || 0}</span> followers
                    </div>
                    <div className="text-center md:text-left">
                        <span className="font-semibold block md:inline">{user.following_count || 0}</span> following
                    </div>
                </div>

                {/* Bio */}
                <div className="text-sm md:text-base px-2 md:px-0">
                    <div className="font-semibold">{user.full_name || user.user_id}</div>
                    <p className="whitespace-pre-wrap">{user.user_bio}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
