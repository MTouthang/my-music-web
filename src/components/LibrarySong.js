import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    // can be done use filter out the songs too
    //   const selectedSong = songs.filter((state) => state.id === id);
    //   setCurrentSong(selectedSong[0]);

    await setCurrentSong(song);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
    if (isPlaying) {
      audioRef.current.play();
    }

    // check if the song is playing-- for promise stuffs not for async await
    // if (isPlaying) {
    //   const playPromise = audioRef.current.play();
    //   if (playPromise !== undefined) {
    //     playPromise.then((audio) => {
    //       audioRef.current.play();
    //     });
    //   }
    // }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3> {song.name} </h3>
        <h4> {song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
