import React, { useState, useRef } from "react";

// import styles ---
import "./styles/app.scss";

// Adding component ---
import Player from "./components/Player";
import Song from "./components/Song";

// utils i.e music data
import data from "./data";
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
    animationPC: 0,
  });

  // library check ---
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate animate PC ---
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);

    const animate = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPC: animate,
    });
  };

  const audioRef = useRef();

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""} `}>
      <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
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
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
