import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import bgVideo from '../assets/bgVideo.png';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

const VideoSection: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(true);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played * 100);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    playerRef.current?.seekTo(percentage, 'fraction');
  };

  const toggleFullscreen = () => {
    const container = document.querySelector('.player-container');
    if (!document.fullscreenElement && container) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full py-6">
      <div 
        className="rounded-2xl overflow-hidden "
        style={{
          background: `url(${bgVideo}) center/cover no-repeat`,
          backgroundSize: '100% 100%',
          padding: '20px',
          minHeight: '320px'
        }}
      >
        <h2 className="text-[#5A1616] text-2xl font-bold text-center mb-2 mt-6 font-['Baloo_2']">
          उत्तर प्रदेश का इतिहास : लघु फ़िल्म
        </h2>
        
        <div className="player-container relative rounded-xl overflow-hidden bg-black/10 backdrop-blur-sm mb-4" style={{ aspectRatio: '16/9' }}>
          <ReactPlayer
            ref={playerRef}
            url="https://youtu.be/dfb7SeApSJo"
            controls={false}
            playsinline
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  showinfo: 0,
                  rel: 0,
                  controls: 0,
                  disablekb: 1,
                  fs: 0,
                  playsinline: 1
                },
                embedOptions: {
                  controls: 0,
                  rel: 0,
                  showinfo: 0
                }
              }
            }}
            width="100%"
            height="100%"
            playing={isPlaying}
            muted={isMuted}
            onEnded={() => {
              setIsPlaying(false);
              setShowPlayer(false);
            }}
            style={{ display: showPlayer ? 'block' : 'none' }}
            onProgress={handleProgress}
            onDuration={handleDuration}
            className="rounded-t-xl"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-b-xl">
            <div 
              className="w-full h-0.5 bg-white/30 rounded-full mb-2 cursor-pointer"
              onClick={handleSeekChange}
            >
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-white/80 transition"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-white/80 transition"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                
                <span className="text-white text-xs">
                  {formatTime(playedSeconds)} / {formatTime(duration)}
                </span>
              </div>
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-white/80 transition"
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;