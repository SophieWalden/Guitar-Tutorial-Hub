
import YouTube from 'react-youtube';
import React from 'react';
import './playlistTab.css';

function PlaylistTab(props) {


  React.useEffect(() => {
      // Function to sort songs by difficulty
      const sortedSongs = props.songs.sort((a, b) => {
          const difficulties = ['?', 'E', 'D', 'C', 'B', 'A', 'S']; // Example difficulties
          return difficulties.indexOf(a.Difficulty) - difficulties.indexOf(b.Difficulty);
      });

      // Function to group sorted songs by difficulty
      const groupSongsByDifficulty = () => {
          const playlists = [];
          sortedSongs.forEach(song => {
              let found = false;

              
              for (let i = 0; i < playlists.length; i++){
                let playlist = playlists[i];

                if (playlist.Name == "Difficulty " + song.Difficulty){
                  playlists[i]["Songs"].push(song);
                  found = true;
                }

              }


              // const foundIndex = playlists.findIndex(list => list.length > 0 && list.Name === "Difficulty " + song.Difficulty);
              if (found == false) {
 
                  playlists.push({"Name": "Difficulty " + song.Difficulty, "Songs": [song]});
              }
          });
          return playlists;
      };

      const playlists = groupSongsByDifficulty();
      props.setPlaylists(playlists); // Assuming you have a way to set playlists in props
  }, []); // Empty dependency array means this effect will run once after the initial render


  let [startIndex, setStartIndex] = React.useState(0);

  const numSongsToShow = 5;
  const totalSongs = props.playlists.length;

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
    displayedSongs.push(props.playlists[(startIndex + i) % totalSongs]);
  }



  const [selectedPlaylist, setSelectedPlaylist] = React.useState({"Selected": "None"});

  return (
    <div className="playlist-container">
        <div id="songs-container-left-content">
            <div id='song-display-container' className={`${selectedPlaylist['Selected'] == "None" ? 'hiddenTab' : ''}`}>

                <h3>{selectedPlaylist.Name}</h3>

                <div id="playlist-song-display">
                  {selectedPlaylist["Selected"] !== "None" && selectedPlaylist.Songs.map((song, index) => (
                    <div key={index} className="playlist-song-item">
                      <h2>{song.Name}</h2>
                    </div>
                  ))}
                </div>
            
                <div id="song-event-buttons">
                    <h2 onClick={() => props.playPlaylist(selectedPlaylist)}>Play Shuffled</h2>
       
                </div>
            </div>
        </div>

        <div id="songs-container-right-content" onWheel={handleWheel}>
  
            <div className="songs-list">
                
                {displayedSongs.map((playlist, index) => (

                    <div key={index} className="song-item" onClick={() => setSelectedPlaylist(playlist)}>
                        <p>{playlist && playlist.Name}</p>
                    </div>
                ))}
            </div>

        </div>
    </div>
  );
}

export default PlaylistTab;
