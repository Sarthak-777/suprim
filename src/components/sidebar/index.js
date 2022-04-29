import React, { useEffect, useState } from 'react';
import './sidebar.css';
import Logo from '../images/smokey.jpg';
import SidebarButton from './sidebarButton';
import {MdFavorite} from 'react-icons/md';
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import apiClient from '../../spotify';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Sidebar(user, setUser) {
  const [token, setToken] = useState("");

  const logout = () => {
    const token = window.localStorage.getItem('token');
    console.log(token);
    setToken(null);
    Navigate("/");
  };

  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"

  );




  useEffect(()=> {
    apiClient.get("me").then(response=>{

      setImage(response.data.images[0].url);})
  },[]);
  return (
    <div className ="sidebar-container">
      <img src={image}  className ="profile-img" alt='profile' />
    <div>
      <SidebarButton title="Feed" to="/feed" icon= {<MdSpaceDashboard />} />
      <SidebarButton title="Trending" to="/trending" icon= {<FaGripfire />} />
      <SidebarButton title="Player" to="/player" icon= {<FaPlay />} />
      <SidebarButton title="Browse" to="/browse" icon= {<MdFavorite />} />
      <SidebarButton title="Library" to="/" icon= {<IoLibrary />} />
      <SidebarButton title="Message" to="/chat" icon= {<ChatBubbleOutlineIcon />} />
      <SidebarButton title="New Playlist" to="" icon= {< AddBoxOutlinedIcon/>} />

    </div>
    <SidebarButton title="Sign Out" to="" onClick = {logout} icon= {< FaSignOutAlt/>} />
    
    </div>



  )
}
