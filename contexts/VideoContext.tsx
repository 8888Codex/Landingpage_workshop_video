import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
  showSecondFold: boolean;
  setShowSecondFold: (show: boolean) => void;
  videoPlayTime: number; // Tempo em segundos desde que o vídeo começou a tocar
  setVideoPlayTime: (time: number) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSecondFold, setShowSecondFold] = useState(false);
  const [videoPlayTime, setVideoPlayTime] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <VideoContext.Provider
      value={{
        showSecondFold,
        setShowSecondFold,
        videoPlayTime,
        setVideoPlayTime,
        isVideoPlaying,
        setIsVideoPlaying,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within VideoProvider');
  }
  return context;
};
