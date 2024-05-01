import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube';
import React from 'react';

import SongsTab from './components/songsTab';
import PlaylistTab from './components/playlistTab';
import PlayTab from './components/playTab';

function App() {

  const [tab, setTab] = React.useState("Songs");
  const [activeSong, setActiveSong] = React.useState({});
  const [queue, setQueue] = React.useState([]);

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


  return (
    <div className="App">
      
      <div id="site-header">
        <h3 onClick={() => setTab("Songs")}>Songs</h3>
        <h3 onClick={() => setTab("Play") || startPlaying()}>Play</h3>
        <h3 onClick={() => setTab("Playlists")}>Playlists</h3>
      </div>

      <div id="site-content">

        <div className={`${tab === 'Songs' ? '' : 'hiddenTab'}`}>
          <SongsTab addSongToQueue={addSongToQueue} playSong={playSong}></SongsTab>
        </div>

        <div className={`${tab === 'Play' ? '' : 'hiddenTab'}`}>
          <PlayTab setActiveSong={setActiveSong} queue={queue} song={activeSong} removeSong={removeSongFromQueue}></PlayTab>
        </div>

        <div className={`${tab === 'Playlists' ? '' : 'hiddenTab'}`}>
          <PlaylistTab></PlaylistTab>
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
