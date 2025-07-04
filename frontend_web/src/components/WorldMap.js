import React, { useState } from "react";

// A minimal SVG world map with clickable regions/countries.
// Should be replaced with a library (e.g., react-simple-maps) in production.
const mockRegions = [
  { code: "NA", name: "North America", cx: 80, cy: 80 },
  { code: "SA", name: "South America", cx: 110, cy: 215 },
  { code: "EU", name: "Europe", cx: 230, cy: 65 },
  { code: "AF", name: "Africa", cx: 210, cy: 170 },
  { code: "AS", name: "Asia", cx: 345, cy: 95 },
  { code: "OC", name: "Oceania", cx: 430, cy: 225 },
];

const WorldMap = ({ tracks, onSelectLocation, selectedLocation }) => {
  const [hoverRegion, setHoverRegion] = useState(null);

  return (
    <div className="MuseMap-WorldMap">
      <h3>Explore Music Worldwide</h3>
      <svg
        viewBox="0 0 500 280"
        width="100%"
        height="220"
        className="WorldMapSVG"
        aria-label="interactive world map"
      >
        <rect x="0" y="0" width="500" height="280" fill="#f5f6fa" />
        {mockRegions.map((region) => (
          <g key={region.code}>
            <circle
              cx={region.cx}
              cy={region.cy}
              r={region.code === selectedLocation ? 24 : 18}
              fill={
                region.code === selectedLocation
                  ? "#1DB954"
                  : hoverRegion === region.code
                  ? "#F5C518"
                  : "#191414"
              }
              opacity={region.code === selectedLocation ? 0.9 : 0.5}
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverRegion(region.code)}
              onMouseLeave={() => setHoverRegion(null)}
              onClick={() => onSelectLocation(region.code)}
            />
            <text
              x={region.cx}
              y={region.cy + 36}
              textAnchor="middle"
              fontSize="13"
              fill={
                region.code === selectedLocation ? "#191414" : "#444"
              }
              style={{
                fontWeight: region.code === selectedLocation ? 700 : 400,
              }}
              pointerEvents="none"
            >
              {region.name}
            </text>
          </g>
        ))}
        {tracks &&
          tracks.map((t, idx) => (
            <circle
              key={"mtrk-" + idx}
              cx={mockRegions.find(r => r.code === t.region)?.cx || 250}
              cy={mockRegions.find(r => r.code === t.region)?.cy || 145}
              r="6"
              fill="#1DB954"
              opacity="0.6"
              stroke="#fff"
              strokeWidth="1"
            >
              <title>
                {t.track} by {t.artist}
              </title>
            </circle>
          ))}
      </svg>
      <div className="MuseMap-WorldMap-Desc">
        <span>
          Click a region to discover top tracks and recommendations.
        </span>
      </div>
      <ul className="MuseMap-TopTracks">
        {tracks &&
          tracks
            .filter((t) => t.region === selectedLocation)
            .slice(0, 4)
            .map((t, idx) => (
              <li key={idx}>
                <span role="img" aria-label="music">
                  🎶
                </span>{" "}
                {t.track} - {t.artist}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default WorldMap;
