import React from "react";

const ProfileDrawer = ({ open, user, onLogout, onClose }) => {
  if (!open) return null;
  return (
    <div className={`MuseMap-ProfileDrawer${open ? " open" : ""}`}>
      <div className="MuseMap-ProfileContent">
        <button className="MuseMap-Modal-Close" onClick={onClose}>
          ×
        </button>
        <div className="MuseMap-Profile-Header">
          {user && user.avatar ? (
            <img src={user.avatar} alt="avatar" className="MuseMap-Avatar-Large" />
          ) : (
            <span className="MuseMap-Avatar-Large">👤</span>
          )}
          <h2>{user.displayName || user.username || "Music Lover"}</h2>
        </div>
        <div className="MuseMap-Profile-Body">
          <p className="MuseMap-Profile-Username">
            Username: <strong>{user.username}</strong>
          </p>
          <p className="MuseMap-Profile-Desc">
            Welcome to MuseMap, the home of location-driven playlists and global sounds.
          </p>
        </div>
        <div className="MuseMap-Profile-Actions">
          <button className="MuseMap-Profile-Logout" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
      <div className="MuseMap-Backdrop" onClick={onClose}/>
    </div>
  );
};

export default ProfileDrawer;
