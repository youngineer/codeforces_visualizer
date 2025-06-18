import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { fetchUserDetails } from '@/services/helper';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchUserDetails("ecnerwala");
      setProfileData(data);
    };
    loadProfile();
  }, []);

  return (
    <div>
      {profileData ? (
        <ProfileCard data={profileData} />
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
