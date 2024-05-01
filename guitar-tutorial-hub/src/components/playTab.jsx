
import YouTube from 'react-youtube';
import React from 'react';
import './playTab.css';

function PlayTab(props) {

  const [playerKey, setPlayerKey] = React.useState(0); // used to re-render the YouTube player

  const opts = {
    playerVars: {
        autoplay: 1,
        mute: 1,
    },
};

  function onEnd(event) {
    // Check if there are more songs in the queue
    if (props.queue.length > 0) {
      // Remove the first song from the queue and set the next song as the current video
      const nextSong = props.queue[0];
      props.queue.shift(); // Remove the first element from the queue

      if (nextSong.id === props.song.id) {
        // If the next song is the same as the initial song, reset the player by changing its key
        setPlayerKey(prevKey => prevKey + 1);
      } else {
        props.setActiveSong(nextSong);
      }
      
    } 
  }

  return (
    <div className="play-container">
        
        <div id="play-left-side">
           <YouTube key={playerKey} id="youtube-video" videoId={props.song["id"]} opts={opts} onReady={_onReady} onEnd={onEnd} />

        </div>
        
        <div id="play-right-side">
          <div id="queue">
            <h2>Queue</h2>

            <div id="queue-holder">

            {props.queue.map((song, index) => (
              <div className="queue-item" key={index}>
                <h2>{song.Name}</h2> <h3 className="deleteButton" onClick={() => props.removeSong(song)}>X</h3>
              </div>
            ))}

            </div>
          </div>

          <div id="play-buttons">
            <h2 onClick={() => props.removeSong(props.queue[0]) || (props.queue.length > 1 && props.setActiveSong(props.queue[1]))}>Skip Song</h2>
          </div>
        </div>

    </div>
  );
}

function _onReady(event) {
  // access to player in all event handlers via event.target
  event.target.playVideo();
}


export default PlayTab;
