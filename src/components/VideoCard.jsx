import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const {url, username, description, song, likes, saves, comments, shares, profilePic, setVideoRef, autoPlay, videoUrl} = props;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if(autoPlay) {
      videoRef.current.play();
    }
  }, [autoPlay]);

  const onVideoPress = () => {
    if(videoRef.current.paused) {
      videoRef.current.play();
    }else {
      videoRef.current.pause();
    }
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        ref = {(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
        muted={isMuted}
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song}/>
        </div>
        <div className="footer-right">
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} onMuteToggle={handleMuteToggle} isMuted={isMuted} videoUrl={videoUrl}/>
          
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
