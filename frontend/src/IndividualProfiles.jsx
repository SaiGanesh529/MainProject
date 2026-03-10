import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from './components/ProfileHeader';
import ProfileGrid from './components/ProfileGrid';

export default function IndividualProfiles() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/insta-share/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          },
        });
        const data = await res.json();
        setProfile(data.user_details);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>;
  if (!profile) return <div className="text-center p-10">Profile not found</div>;

  return (
    <div className="w-full">
      <ProfileHeader
        user={profile}
        actions={
          <button className="bg-blue-500 text-white px-6 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600">
            Follow
          </button>
        }
      />
      <ProfileGrid posts={profile.posts} />
    </div>
  );
}
