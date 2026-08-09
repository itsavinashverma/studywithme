import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Play, Pause, SkipBack, SkipForward, Shuffle } from 'lucide-react';
import playlistData from '../../data/playlist.json';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState(playlistData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const playerRef = useRef(null);

  const currentSong = playlist[currentIndex];

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const onStateChange = (event) => {
    // 1 is playing, 2 is paused, 0 is ended
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
    if (event.data === 0) handleNext();
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      setCurrentIndex(Math.floor(Math.random() * playlist.length));
    } else {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="glass-panel music-player-container">
      {/* Hidden YouTube Player */}
      <div className="youtube-hidden">
        <YouTube
          videoId={currentSong.youtubeId}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      <div className="song-info">
        <div className="album-art">
          <img src={`https://img.youtube.com/vi/${currentSong.youtubeId}/hqdefault.jpg`} alt="Album Art" />
        </div>
        <div className="track-details">
          <h3 className="song-title">
            {currentSong.title.length > 17 ? currentSong.title.substring(0, 17) + '...' : currentSong.title}
          </h3>
          <p className="song-artist">
            {currentSong.artist.length > 20 ? currentSong.artist.substring(0, 20) + '...' : currentSong.artist}
          </p>
        </div>
      </div>

      <div className="player-controls">
        <button className={`icon-btn ${isShuffle ? 'active' : ''}`} onClick={() => setIsShuffle(!isShuffle)}>
          <Shuffle size={18} />
        </button>
        <button className="icon-btn" onClick={handlePrev}>
          <SkipBack size={20} />
        </button>
        <button className="icon-btn play-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="icon-btn" onClick={handleNext}>
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
