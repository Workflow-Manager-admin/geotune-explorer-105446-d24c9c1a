import React from "react";
import logo from "../assets/logo.svg";

const Sidebar = ({ theme, onThemeToggle, onLogin, user, onFiltersOpen }) => {
  return (
    <aside className="MuseMap-Sidebar">
      <div className="MuseMap-Sidebar-Logo">
        <img src={logo} alt="MuseMap Logo" />
      </div>
      <nav className="MuseMap-Sidebar-Nav">
        <a href="/" className="MuseMap-NavLink active">
          🌍 World Map
        </a>
        <a href="#playlists" className="MuseMap-NavLink">
          🎵 Playlists
        </a>
        <a href="#recommendations" className="MuseMap-NavLink">
          ⭐ Recommendations
        </a>
        <button className="MuseMap-NavBtn" onClick={onFiltersOpen}>
          🔍 Filters
        </button>
      </nav>
      <div className="MuseMap-Sidebar-Footer">
        <button
          onClick={onThemeToggle}
          className="MuseMap-Sidebar-ThemeToggle"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user && user.id ? (
          <button className="MuseMap-ProfileBtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {user.avatar ? <img src={user.avatar} className="MuseMap-Avatar" alt="avatar" /> : "👤"}
          </button>
        ) : (
          <button className="MuseMap-LoginBtn" onClick={onLogin}>
            Log In
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
