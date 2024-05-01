
import YouTube from 'react-youtube';
import React from 'react';
import './songsTab.css';

function SongsTab(props) {
    
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
    {"Name": "Imagine", "id": "NhVujencTRs", "Difficulty": "?"},
    {"Name": "Oogway Ascends", "id": "euLkHYrEolU", "Difficulty": "A"},
    {"Name": "Bohemian Rhapsody", "id": "ejHBHkNr-zY", "Difficulty": "A"},
    {"Name": "Sweden", "id": "MPKOogJCCKU", "Difficulty": "B"},
    {"Name": "Feel Good", "id": "pM1NQPLiWzk", "Difficulty": "A"},
    {"Name": "Roundabout", "id": "yjA5Nm7Bq9M", "Difficulty": "A"},
    {"Name": "Neon Genesis Evangelion", "id": "05rgMroLA_s", "Difficulty": "A"},
    {"Name": "Rush E", "id": "tIIim_qzeb4", "Difficulty": "S"},
    {"Name": "Howls Moving Castle", "id": "mB3lWr6iYmI", "Difficulty": "A"},
    {"Name": "Careless Whisper", "id": "yCME7VQCMh4", "Difficulty": "A"},
  ]);

  let [startIndex, setStartIndex] = React.useState(0);

  const numSongsToShow = 5;
  const totalSongs = songs.length;

  const nextSongs = () => {
      setStartIndex((prevIndex) => (prevIndex + 1) % totalSongs);
  };

  const prevSongs = () => {
      setStartIndex((prevIndex) => (prevIndex - 1 + totalSongs) % totalSongs);
  };

  const handleWheel = (event) => {
        if (event.deltaY < 0) {
            prevSongs();
        } else {
            nextSongs();
        }
    };

  // Generate a displayedSongs array that loops to achieve at least numSongsToShow items
  let displayedSongs = [];
  for (let i = 0; i < numSongsToShow; i++) {
    displayedSongs.push(songs[(startIndex + i) % totalSongs]);
  }



  const [selectedSong, setSelectedSong] = React.useState({"Selected": "None"});

  return (
    <div className="songs-container">
        
        <div id="songs-container-left-content">
            <div id='song-display-container' className={`${selectedSong['Selected'] == "None" ? 'hiddenTab' : ''}`}>

            
                <img src={`https://img.youtube.com/vi/${selectedSong['id']}/hqdefault.jpg`} id='song-thumbnail'></img>
                
                <div id='song-description'>
                    <h2>{selectedSong['Name']}</h2>
                
                </div>

                <div id="song-event-buttons">
                    <h2 onClick={() => props.playSong(selectedSong)}>Practice</h2>
                    <h2 onClick={() => props.addSongToQueue(selectedSong)}>Add To Queue</h2>
                    <h2>Add To Playlist</h2>
                </div>
            </div>
        </div>

        <div id="songs-container-right-content" onWheel={handleWheel}>
  
            <div className="songs-list">
                
                {displayedSongs.map((song, index) => (

                    <div key={index} className="song-item" onClick={() => setSelectedSong(song)}>
                        <p>{song.Name} (Difficulty: {song.Difficulty})</p>
                    </div>
                ))}
            </div>

        </div>
    </div>
  );
}


export default SongsTab;
