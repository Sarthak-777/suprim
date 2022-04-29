import React, { useEffect, useState } from 'react'
import APIKit from '../../spotify';
import './browse.css';

import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton, InputAdornment } from '@mui/material';





export default function Browse() {
    const [categories, setcategories] = useState(null)
    const [songs, setSongs] = useState("")
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [isSearched ,setIsSearched] = useState(false);



    useEffect(() => {
      APIKit.get(`/search?query=${songs}&type=track%2Cartist&limit=20&offset=0`).then(function(response) {

        setArtists(response.data.artists.items);
        setTracks(response.data.tracks.items);
        setIsSearched(true)

      })
    
    }, [songs])
    console.log(artists)
    console.log(tracks)
    
    const isEmpty = (setIsSearched) => { 
      if (songs ===""){
        setIsSearched(false)
      }else{
        setIsSearched(true);
      }
    }

    

    useEffect(() => {
        APIKit.get('/browse/categories').then(function(response) {
            setcategories(response.data.categories.items);

        })
    },[])

    

  return (
    <div className="screen-container">  
     <div >

     <TextField 
        className="search" 
        placeholder='Search for Songs and Artists'
        value={songs}
        onChange={e => {setSongs(e.target.value)}}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
            </InputAdornment>  
          )
        }}/> 
        </div> 
        
        {!isSearched ? (
          <div className="library-body">
          {categories?.map((category) =>(
            <div className="playlist-card" key={category.id}>
              <img className="playlist-image" src={category?.icons[0]?.url}></img>
              <p className="playlist-title" >{category.name}</p>
            </div>
          ))}
       </div>
        ): (
          <div className="library-body">
            {artists?.map((artist) => (
              <div className="playlist-card" key={artist.id}>
                <img className="playlist-image" src={artist?.images[0]?.url} />
                <p className="playlist-title" >{artist?.name}</p>
              </div>
             ) )}
          </div>
        )}
       
        

           </div>
  )
}
