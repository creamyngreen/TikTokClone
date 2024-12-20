import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import UserProfile from "./components/UserProfile";
import profile from "./assets/profile.jpg";
// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic:
      "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const mouseStartY = useRef(null);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  // Autoplay or pause based on intersection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  // Handle mouse interactions for video navigation
  const handleMouseDown = (event) => {
    mouseStartY.current = event.clientY;
  };

  const handleMouseUp = (event) => {
    const diffY = event.clientY - mouseStartY.current;

    if (Math.abs(diffY) > 50) { // Threshold for detecting swipe
      if (diffY > 0 && currentVideoIndex > 0) {
        setCurrentVideoIndex((prevIndex) => prevIndex - 1); // Navigate to previous video
      } else if (diffY < 0 && currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex((prevIndex) => prevIndex + 1); // Navigate to next video
      }
    }
  };

  useEffect(() => {
    // Scroll to the current video
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentVideoIndex]);

  return (
  <BrowserRouter>
      <div className="app"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      >
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopNavbar className="top-navbar" setSearchTerm={setSearchTerm} />
                  {videos
                    .filter((video) => video.description.includes(searchTerm))
                    .map((video, index) => (
                      <VideoCard
                        key={index}
                        username={video.username}
                        description={video.description}
                        song={video.song}
                        likes={video.likes}
                        saves={video.saves}
                        comments={video.comments}
                        shares={video.shares}
                        url={video.url}
                        profilePic={profile}
                        setVideoRef={handleVideoRef(index)}
                        autoplay={index === 0}
                        videoUrl={video.url}
                      />
                    ))}
                </>
              }
            />
            <Route
              path="/user-profile"
              element={<UserProfile profilePic={profile} />}
            />
          </Routes>
          <BottomNavbar className="bottom-navbar" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
