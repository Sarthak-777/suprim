import React from 'react';
import Browse from '../../screens/Browse';

function isEmpty(SetIsSearched,songs){

    if (songs ===""){
        SetIsSearched(false)
      }else{
        SetIsSearched(true);
      }
}

function change(setSongs,songs){
    e => setSongs(e.target.value)
}

function searchMain(){
    this.change();
    this.isEmpty();
}

export default searchMain;