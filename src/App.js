import React, { useState, useRef } from "react";

// import styles ---
import "./styles/app.scss";

// Adding component ---
import Player from "./components/Player";
import Song from "./components/Song";

// utils i.e music data
import data from "./utils";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  //stat for time stream of song
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // library check ---
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const audioRef = useRef();

  return (
    <div className="App">
      <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
