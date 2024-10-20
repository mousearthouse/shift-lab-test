import React, { useEffect, useState } from "react";
import "./App.css";
import { getProfile } from "./api";

interface ProfilePageProps {
  token: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ token }) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((response) => {
          setProfile(response);
          console.log(JSON.stringify(response) + ", profile page");
        })
        .catch((err) => console.log(err));
    }
  }, [token, setProfile]);

  if (!profile) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div className="content">
        <h1>Ваш профиль</h1>
        <div className="container">
            <h3>ID:</h3>
            <p>{profile.user._id}</p>
        </div>
        <div className="container">
            <h3>Телефон:</h3>
            <p>{profile.user.phone}</p>
        </div>
    </div>
  );
};

export default ProfilePage;
