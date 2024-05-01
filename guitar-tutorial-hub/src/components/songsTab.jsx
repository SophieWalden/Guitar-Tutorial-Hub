
import YouTube from 'react-youtube';
import React from 'react';
import './songsTab.css';

function SongsTab(props) {
    


  let [startIndex, setStartIndex] = React.useState(0);

  const numSongsToShow = 5;
  const totalSongs = props.songs.length;
  const [sortBy, setSortBy] = React.useState("Difficulty");

  const [displayedSongs, setDisplayedSongs] = React.useState(calculateDisplayedSongs());

  React.useEffect(() => {
    // This will recompute displayedSongs whenever startIndex or sortBy changes
    setDisplayedSongs(calculateDisplayedSongs());
  }, [startIndex, sortBy, props.songs]); // Also, re-run when props.songs changes

  function calculateDisplayedSongs() {
    let songsToDisplay = [];
    let sortedSongs = sortSongs(props.songs, sortBy);
    for (let i = 0; i < numSongsToShow; i++) {
      songsToDisplay.push(sortedSongs[(startIndex + i) % totalSongs]);
    }
    return songsToDisplay
  }

  

  const nextSongs = () => {
    setStartIndex(prevIndex => (prevIndex + 1) % totalSongs);
  };

  const prevSongs = () => {
    setStartIndex(prevIndex => (prevIndex - 1 + totalSongs) % totalSongs);
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      prevSongs();
    } else {
      nextSongs();
    }
  };

  

  function userCreatedPlaylists(){
    return props.playlists.filter(playlist => !playlist.Name.includes('Difficulty'));
  }

  const filteredPlaylists = userCreatedPlaylists();

  const [selectedSong, setSelectedSong] = React.useState(props.songs[0]);
  const [showPlaylistLayover, setShowPlaylistLayover] = React.useState(false);

  function addToPlaylist(playlist, song){
    for (let i = 0; i < props.playlists.length; i++){
        if (props.playlists[i].Name == playlist.Name){

            let tempPlaylist = props.playlists;
            tempPlaylist[i].Songs.push(song);

            props.setPlaylists(tempPlaylist);
        }
    }
  }

  function sortSongs(songs, sortBy) {
    return songs.sort((a, b) => {
      if (sortBy === "Name") {
        return a.Name.localeCompare(b.Name); // Sorting by name alphabetically
      } else if (sortBy === "Difficulty") {
        return a.Difficulty.localeCompare(b.Difficulty); // Sorting by difficulty
      }
    });
  }

  
  return (
    <div className="songs-container">

        <div id="playlist-layover" className={`${showPlaylistLayover ? '' : 'hiddenTab'}`}>
            <div id="playlist-layover-top-content">
                <h3>Add to Playlist</h3>
                <h3 id="playlist-exit-button" onClick={() => setShowPlaylistLayover(false)}>X</h3>
            </div>

            <div id="playlist-layover-bottom-content">
                <div onClick={() => props.setPlaylists(playlists => [...playlists, {"Name": "User Generated Playlist", "Songs": []}])}id="create-new-playlist"><h2>+</h2><h3>Create a playlist</h3></div>

                {filteredPlaylists.map((playlist, index) => (
                    <div onClick={() => addToPlaylist(playlist, selectedSong)} key={index} className="playlist-item">
                        <h2>{playlist.Name}</h2>
                    </div>
                ))}
            
            </div>
        </div>
        
        <div id="songs-container-left-content">
            <div id="sorting-options">
                <h3>Sort By: </h3>
                <h3 className={`${sortBy === "Difficulty" ? 'chosenClass' : ''} sortingChoice`} onClick={() => setSortBy("Difficulty")}>Difficulty</h3>
                <h3 className={`${sortBy === "Name" ? 'chosenClass' : ''} sortingChoice`} onClick={() => setSortBy("Name")}>Name</h3>
            </div>
            <div id='song-display-container' className={`${selectedSong['Selected'] == "None" ? 'hiddenTab' : ''}`}>

            
                <img src={`https://img.youtube.com/vi/${selectedSong['id']}/hqdefault.jpg`} id='song-thumbnail'></img>
                
                <div id='song-description'>
                    <h2>{selectedSong['Name']}</h2>
                
                </div>

                <div id="song-event-buttons">
                    <h2 onClick={() => props.playSong(selectedSong)}>Practice</h2>
                    <h2 onClick={() => props.addSongToQueue(selectedSong)}>Add To Queue</h2>
                    <h2 onClick={() => setShowPlaylistLayover(true)}>Add To Playlist</h2>
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
