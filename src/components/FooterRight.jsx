import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faThreads } from '@fortawesome/free-brands-svg-icons';

import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoUrl }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [isSharePopupVisible, setSharePopupVisible] = useState(false);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000); // Change the delay time (in milliseconds) as needed
  };

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleSaveClick = () => {
    setSaved((prevSaved) => !prevSaved);
    navigator.clipboard.writeText(videoUrl); // Copy the video URL to clipboard
  };

  const handleShareClick = () => {
    setSharePopupVisible(true);
  };

  const closeSharePopup = () => {
    setSharePopupVisible(false);
  };

  return (
    <div className='footer-right'>
      <div className='sidebar-icon'>
        {profilePic ? (
          //Display user profile picture
          <img 
            src={profilePic} 
            className='userprofile' 
            alt='Profile' 
            style={{witdh:'45px', height:'45px', color:'616161'}} 
            onClick={() => navigate('/user-profile')}
          />
        ): null}
        {/*The user add icon */}
        <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{witdh:'15px', height:'15px', color:'#FF0000'}} 
        onClick={handleUserAddClick} />
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon 
        icon={faHeart}
        style={{witdh:'35px', height:'35px', color: liked ? '#FF0000' : 'white'}}
        onClick={handleLikeClick}
        />
        {/*Display the format of likes count*/}
        <p>{formatLikesCount(parseLikesCount(likes) + (liked?1 : 0))}</p>
        </div>
      <div className='sidebar-icon'>
        {/* the comment icon */}
        <FontAwesomeIcon icon={faCommentDots} style={{witdh:'35px', height:'35px', color:'white'}} />
        {/*Display the number of comments*/}
        <p>{comments}</p>
      </div>
      <div className='sidebar-icon'>
        {saved ? (
          // Display the bookmark icon when saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{witdh:'35px', height:'35px', color:'ffc107'}}
            onClick={handleSaveClick}
          />
        ) : (
          // Display the bookmark icon when not saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{witdh:'35px', height:'35px', color:'white'}}
            onClick={handleSaveClick}
          />
        )}
        {/*Display the number of saved */}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className='sidebar-icon'>
        {/*the share icon */}
        <FontAwesomeIcon 
          icon={faShare} 
          style={{ width: '35px', height: '35px', color: 'white' }} 
          onClick={handleShareClick}
        />
        {/*Display the number of shares */}
        <p>{shares}</p>
      </div>l
      <div className='sidebar-icon record'>
        {/*Display the record icon*/}
        <img src="https://static.thenounproject.com/png/934821-200.png" alt='Record icon'/>

      </div>

      {/* Share Popup */}
      {isSharePopupVisible && (
        <div className='share-popup'>
          <button onClick={closeSharePopup} className='close-popup'>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'black', width: '20px', height: '20px' }} />
          </button>
          <h3 style={{ color: 'black', textShadow: 'none' }}>Share on:</h3>
          <div className='share-buttons'>
            <button className='share-button'>
              <FontAwesomeIcon icon={faFacebook} style={{color:'#003899', width: '30px', height: '30px'}} />
            </button>
            <button className='share-button'>
              <FontAwesomeIcon icon={faInstagram} style={{color:'#c81e78', width: '30px', height: '30px'}}/>
            </button>
            <button className='share-button'>
              <FontAwesomeIcon icon={faThreads} style={{color:'#000000', width: '30px', height: '30px'}}/>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default FooterRight;
