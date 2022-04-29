import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { setClientToken } from '../../spotify';
import Trending from '../trending/trending';
import Library from '../library/library';
import Player from '../player/player';
import Browse from '../Browse';
import './home.css'
import Sidebar from '../../components/sidebar';
import Login from '../auth/login';
import Register from '../auth/register';
import ChatScreen from '../chatScreen/chat';
import Profile from '../Profile/profile';

export default function Home() {




  const [token, setToken] = useState("");
 
  useEffect(()=>{
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash ='';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else{
      setToken(token);
      setClientToken(token);
    }
    
  },[]);

  return !token ? (
    <Login />
    ) : (
    
      <div className='main-body'>
        <Sidebar />
        <Routes>
            <Route path='/' element={<Library />} />
            {/* <Route path='/feed' element={<Feed />} /> */}
            <Route path='/trending' element={<Trending />} />
            <Route path='/player' element={<Player />} />
            <Route path='/browse' element={<Browse /> }/>
            <Route path='/chat' element={<ChatScreen />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />

        </Routes>
        </div>
    
  );
}
