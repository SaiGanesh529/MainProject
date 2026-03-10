import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPost from './AddPost';
import ProfileHeader from './components/ProfileHeader';
import ProfileGrid from './components/ProfileGrid';

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editBio, setEditBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const DEFAULT_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/users/my-profile", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('jwt_token');
          navigate("/login");
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await res.json();
      setProfile(data.profile);
    } catch (error) {
      console.error("Error fetching my profile:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handlePostAdded = useCallback(() => {
    fetchProfile();
    setShowAddPost(false);
  }, [fetchProfile]);

  const handleEditProfile = useCallback(() => {
    if (profile) {
      setEditBio(profile.user_bio || '');
      setShowEditProfile(true);
    }
  }, [profile]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setProfilePic(file);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      if (editBio !== undefined) formData.append('bio', editBio);
      if (profilePic) formData.append('profile_pic', profilePic);

      const res = await fetch('/api/users/my-profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      await fetchProfile();
      setShowEditProfile(false);
      setProfilePic(null);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = useCallback(() => {
    setShowEditProfile(false);
    setProfilePic(null);
    setEditBio('');
  }, []);

  if (showAddPost) {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-6">
        <AddPost onPostAdded={handlePostAdded} />
        <button onClick={() => setShowAddPost(false)} className="mt-4 text-blue-600 hover:underline">Cancel</button>
      </div>
    );
  }

  // Edit Profile Modal (Simplified overlay or inline)
  if (showEditProfile) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

          <div className="mb-4 text-center">
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : profile?.profile_pic || DEFAULT_AVATAR
              }
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
            />
            <label className="text-blue-500 font-semibold text-sm cursor-pointer">
              Change Profile Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Bio</label>
            <textarea
              className="w-full border rounded p-2 text-sm"
              rows="3"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Bio"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={handleCancelEdit} className="flex-1 py-2 border rounded font-semibold text-sm">Cancel</button>
            <button onClick={handleUpdateProfile} disabled={updating} className="flex-1 py-2 bg-blue-500 text-white rounded font-semibold text-sm">
              {updating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>;
  if (!profile) return <div className="text-center p-10">Profile not found</div>;

  return (
    <div className="w-full">
      <ProfileHeader
        user={profile}
        actions={
          <>
            <button
              onClick={() => setShowEditProfile(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-1.5 rounded-lg text-sm font-semibold"
            >
              Edit profile
            </button>
            <button
              onClick={() => setShowAddPost(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-1.5 rounded-lg text-sm font-semibold"
            >
              New Post
            </button>
            {/* Settings icon usually goes here */}
          </>
        }
      />

      {/* Highlights would go here */}

      <ProfileGrid posts={profile.posts} />
    </div>
  );
}

export default MyProfile;