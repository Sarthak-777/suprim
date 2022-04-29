import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import APIKit from '../../spotify';
import "./profile.css";

export default function Profile() {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  

  useEffect(()=> {
    APIKit.get('/me').then(function(response) {
      setProfile(response.data);

    });
  },[]);

  return (
    <div className="profile-container">
      <h1>Welcome</h1>
      <div className="profile-pic">
       <img src= {profile?.images[0]?.url}></img>
       <p>{profile?.display_name}</p>
    
      </div>

    </div>
  )
}
