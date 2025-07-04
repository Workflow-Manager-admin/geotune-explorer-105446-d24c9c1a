import React from "react";

const PlaylistSection = ({
  playlist,
  recommendations,
  loading,
  user,
  onFiltersOpen
}) => {
  return (
    <div className="MuseMap-PlaylistBox">
      <div className="MuseMap-Section-Header">
        <h2>Your Playlist</h2>
        <button className="MuseMap-FiltersBtn" onClick={onFiltersOpen}>
          <span role="img" aria-label="filter">
            🔍
          </span>{" "}
          Filters
        </button>
      </div>
      {loading ? (
        <div className="MuseMap-Loader">Loading...</div>
      ) : (
        <>
          <ul className="MuseMap-PlaylistList">
            {playlist && playlist.length ? (
              playlist.map((song, i) => (
                <li key={i} className="MuseMap-PlaylistItem">
                  <span className="MuseMap-SongTitle">{song.track}</span>
                  <span className="MuseMap-Artist">
                    &nbsp;by {song.artist}
                  </span>
                  {song.language && (
                    <span className="MuseMap-Badge">{song.language}</span>
                  )}
                </li>
              ))
            ) : (
              <li>No songs found for your filters.</li>
            )}
          </ul>
          <div className="MuseMap-Recommendations">
            <h3>Recommended for You</h3>
            <ul>
              {recommendations && recommendations.length ? (
                recommendations.map((rec, idx) => (
                  <li key={idx}>
                    <span role="img" aria-label="star">
                      ⭐
                    </span>{" "}
                    {rec.track} - {rec.artist}
                  </li>
                ))
              ) : (
                <li>No recommendations right now.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistSection;
