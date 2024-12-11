import React from "react";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faPlus,
  faBagShopping,
  faShop,
  faLock,
  faHeart,
  faRetweet,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

const UserProfile = ({ profilePic }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="plus-icon-container">
          <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
        </div>
        <h2 className="username">@embebebong</h2>
        <p className="stats">
          <span>
            <strong className="stats-number">309</strong>
            <br />
            Đã follow
          </span>
          <span>
            <strong className="stats-number">3</strong>
            <br />
            Followers
          </span>
          <span>
            <strong className="stats-number">20</strong>
            <br />
            Thích
          </span>
        </p>
      </div>
      <div
        className="profile-actions"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button className="edit-profile">Sửa hồ sơ</button>
        <button className="share-profile">Chia sẻ hồ sơ</button>
        <button className="find-people">
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>
      <button className="add-bio">
        <FontAwesomeIcon icon={faPlus} /> Thêm tiểu sử
      </button>

      <button className="order-icon">
        <FontAwesomeIcon icon={faShop} style={{ color: "red",marginRight: "8px" }} />
        <span style={{ fontSize: "1.2em", }}>TikTok Studio</span> |{"  "}
        <FontAwesomeIcon icon={faBagShopping} style={{ color: "red",marginLeft: "8px",marginRight: "8px" }} />
        <span style={{ fontSize: "1.2em" }}> Đơn hàng của bạn</span>
      </button>
      <div className="icon-buttons" style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button className="icon-button">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={faLock} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={faRetweet} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={farBookmark} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>

      <div className="upload-prompt">
        <FontAwesomeIcon icon={faImages} className="icon-style" />
        <p>Đâu là những bức ảnh đẹp bạn đã chụp được gần đây?</p>
        <button className="upload-button">Tải lên</button>
      </div>
    </div>
  );
};

export default UserProfile;
