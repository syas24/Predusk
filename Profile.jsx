import React, { useEffect, useState } from "react";
import { getProfile } from "../api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Education: {profile.education}</p>
      <p>Skills: {profile.skills.join(", ")}</p>
    </div>
  );
}

export default Profile;
