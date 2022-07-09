import React from "react";

// styles import ---

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        src={currentSong.cover}
        alt="current song play"
        className={`${isPlaying ? "rotate" : "pause-rotate"}`}
      />
      <h2> {currentSong.name} </h2>
      <h3> {currentSong.artist}</h3>
    </div>
  );
};

export default Song;
