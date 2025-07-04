import React from "react";

const Topbar = ({ theme, onThemeToggle, user, onProfileOpen }) => {
  return (
    <header className="MuseMap-Topbar">
      <div className="MuseMap-Topbar-Title">
        <span>MuseMap</span>
      </div>
      <nav className="MuseMap-Topbar-Nav">
        {user && user.id ? (
          <button className="MuseMap-AvatarBtn" onClick={onProfileOpen}>
            {user.avatar ? <img src={user.avatar} className="MuseMap-Avatar" alt="avatar" /> : "👤"}
            {user.displayName || user.username}
          </button>
        ) : (
          <span className="MuseMap-Guest">Guest</span>
        )}
        <button
          onClick={onThemeToggle}
          className="MuseMap-Topbar-ThemeToggle"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
};

export default Topbar;
