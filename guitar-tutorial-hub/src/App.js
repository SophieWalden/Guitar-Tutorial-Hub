import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube';
import React from 'react';

import SongsTab from './components/songsTab';
import PlaylistTab from './components/playlistTab';
import PlayTab from './components/playTab';

function App() {

  let [songs, setSongs] = React.useState([
    {"Name": "Hey Jude", "id": "kNwoqVGabUY", "Difficulty": "B"},
    {"Name": "House of the Rising Sun", "id": "MUT_EiuRW9I", "Difficulty": "D"},
    {"Name": "City of Stars", "id": "SG8GJi1nihY", "Difficulty": "A"},
    {"Name": "Paint It Black", "id": "YB64246t5i0", "Difficulty": "C"},
    {"Name": "Take Me To Church", "id": "bPSvXc31A6U", "Difficulty": "S"},
    {"Name": "Fly me to the Moon", "id": "YhJco3FwYOc", "Difficulty": "A"},
    {"Name": "Just the Two of Us", "id": "1KcXQ9oCPDU", "Difficulty": "S"},
    {"Name": "Come Along With Me", "id": "2xuCURstH_w", "Difficulty": "B"},
    {"Name": "Let It Be", "id": "lKYQqVrnBsw", "Difficulty": "B"},
    {"Name": "Imagine", "id": "NhVujencTRs", "Difficulty": "B"},
    {"Name": "Oogway Ascends", "id": "euLkHYrEolU", "Difficulty": "A"},
    {"Name": "Bohemian Rhapsody", "id": "ejHBHkNr-zY", "Difficulty": "A"},
    {"Name": "Sweden", "id": "MPKOogJCCKU", "Difficulty": "B"},
    {"Name": "Feel Good", "id": "pM1NQPLiWzk", "Difficulty": "A"},
    {"Name": "Roundabout", "id": "yjA5Nm7Bq9M", "Difficulty": "A"},
    {"Name": "Neon Genesis Evangelion", "id": "05rgMroLA_s", "Difficulty": "A"},
    {"Name": "Rush E", "id": "tIIim_qzeb4", "Difficulty": "S"},
    {"Name": "Howls Moving Castle", "id": "mB3lWr6iYmI", "Difficulty": "A"},
    {"Name": "Careless Whisper", "id": "yCME7VQCMh4", "Difficulty": "A"},
    {"Name": "Somewhere Over The Rainbow", "id": "WuGh1Vre0VI", "Difficulty": "A"},
    {"Name": "Renai Circulation", "id": "UuPgnkZ1f0I", "Difficulty": "A"},
    {"Name": "Personal Jesus", "id": "2VqyBRXci5c", "Difficulty": "B"},
    {"Name": "Super Mario Theme", "id": "JbSVVLdakDM", "Difficulty": "A"},
    {"Name": "The Sound of Silence", "id": "JsGtpRhj82Y", "Difficulty": "B"},
    {"Name": "Kill Bill", "id": "1b6pYbLe1gM", "Difficulty": "S"},
    {"Name": "Stand By Me", "id": "RHaJ2D2rd6M", "Difficulty": "S"},
    {"Name": "Fur Elise", "id": "9Ikb8QhVev0", "Difficulty": "A"},
    {"Name": "Ratatouille", "id": "E2Tj_CQDrk4", "Difficulty": "S"},
    {"Name": "Rise", "id": "6_AL6BFFl3E", "Difficulty": "S"},
  ]);

  const [tab, setTab] = React.useState("Songs");
  const [activeSong, setActiveSong] = React.useState({});
  const [queue, setQueue] = React.useState([]);
  const [playlists, setPlaylists] = React.useState([]);

  const opts = {
      height: '390',
      width: '640',
      playerVars: {
          autoplay: 1,
          mute: 1,
      },
  };

  let videoId = "kNwoqVGabUY";

  function playSong(song){
    setTab("Play");
    setQueue(queue => [song, ...queue]);

    setActiveSong(song);
    
    
  }

  function addSongToQueue(song){
    setQueue(queue => [...queue, song]);
  }

  function removeSongFromQueue(song){
    setQueue((prevQueue) => {
      // Find the index of the first occurrence of the song in the queue
      const index = prevQueue.findIndex((s) => s.id === song.id);
  
      // If the song is found, remove it
      if (index !== -1) {
        // Using slice to avoid mutating the original array directly
        const newQueue = [...prevQueue];
        newQueue.splice(index, 1);
        return newQueue;
      }
  
      // If the song is not found, return the original queue unchanged
      return prevQueue;
    });
  }

  function startPlaying(){
    if (queue.length > 0 && activeSong == {}){
      setActiveSong(queue[0]);
      setQueue(queue => queue.slice(1))
    }
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

  function playPlaylist(playlist){

    let songs = shuffleArray(structuredClone(playlist.Songs));
    setQueue(songs);
    setActiveSong(songs[0]);
    setTab("Play")
  }


  return (
    <div className="App">
      
      <div id="site-header">
        <h3 onClick={() => setTab("Songs")}>Songs</h3>
        <h3 onClick={() => setTab("Play") || startPlaying()}>Play</h3>
        <h3 onClick={() => setTab("Playlists")}>Playlists</h3>
      </div>

      <div id="site-content">

        <div className={`${tab === 'Songs' ? '' : 'hiddenTab'}`}>
          <SongsTab playlists={playlists} setPlaylists={setPlaylists} songs={songs} addSongToQueue={addSongToQueue} playSong={playSong}></SongsTab>
        </div>

        <div className={`${tab === 'Play' ? '' : 'hiddenTab'}`}>
          <PlayTab setActiveSong={setActiveSong} queue={queue} song={activeSong} removeSong={removeSongFromQueue}></PlayTab>
        </div>

        <div className={`${tab === 'Playlists' ? '' : 'hiddenTab'}`}>
          <PlaylistTab playPlaylist={playPlaylist} songs={songs} playlists={playlists} setPlaylists={setPlaylists}></PlaylistTab>
        </div>
        
      </div>

      {/* <YouTube videoId={videoId} opts={opts} onReady={_onReady} /> */}
    </div>
  );
}

function _onReady(event) {
  // access to player in all event handlers via event.target
  event.target.playVideo();
}

export default App;
