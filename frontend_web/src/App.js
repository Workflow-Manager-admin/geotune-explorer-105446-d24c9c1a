import React, { useState, useEffect, createContext } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import WorldMap from "./components/WorldMap";
import PlaylistSection from "./components/PlaylistSection";
import FiltersDrawer from "./components/FiltersDrawer";
import AuthModal from "./components/AuthModal";
import ProfileDrawer from "./components/ProfileDrawer";
import { fetchUserProfile, fetchPlaylists, fetchRecommendations, fetchMapMusic } from "./utils/api";
import "./App.css";

// AuthContext to share user authentication state
export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
function App() {
  // Application state
  const [theme, setTheme] = useState("light");
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isProfileDrawerOpen, setProfileDrawerOpen] = useState(false);

  const [user, setUser] = useState(null); // null = not loaded, {} = guest, {...} = user object
  const [authLoading, setAuthLoading] = useState(true);

  // Filter states
  const [filters, setFilters] = useState({
    activity: null,
    language: null,
    timeOfDay: null
  });
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  // Data states
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapTracks, setMapTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load user (on mount / login)
  useEffect(() => {
    async function loadUser() {
      setAuthLoading(true);
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch {
        setUser({});
      }
      setAuthLoading(false);
    }
    loadUser();
  }, []);

  // Load initial playlist & map when filters/user changes
  useEffect(() => {
    if (user && !authLoading) {
      loadData();
    }
    // eslint-disable-next-line
  }, [filters, user, selectedLocation]);

  // Load playlists, recommendations, and map music
  async function loadData() {
    setLoadingPlaylist(true);
    try {
      // World map
      const mapRes = await fetchMapMusic(filters, selectedLocation);
      setMapTracks(mapRes || []);

      // User playlist
      const pl = await fetchPlaylists({
        ...filters,
        location: selectedLocation,
      });
      setPlaylist(pl || []);

      // Recommendations (based on activity, lang, profile)
      const rec = await fetchRecommendations({
        ...filters,
        location: selectedLocation,
      });
      setRecommendations(rec || []);
    } catch (e) {
      // Handle global error
    }
    setLoadingPlaylist(false);
  }

  // Handlers
  const handleThemeToggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const handleLoginClick = () => setAuthModalOpen(true);
  const handleAuthSuccess = (profile) => {
    setUser(profile);
    setAuthModalOpen(false);
  };
  const handleLogout = () => {
    setUser({});
    setProfileDrawerOpen(false);
  };

  const handleFiltersOpen = () => setFiltersOpen(true);
  const handleFiltersClose = () => setFiltersOpen(false);
  const handleFiltersApply = (newFilters) => {
    setFilters(newFilters);
    setFiltersOpen(false);
  };

  const handleMapSelect = (location) => setSelectedLocation(location);

  // Render
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="MuseMap-Root">
        <Sidebar
          theme={theme}
          onThemeToggle={handleThemeToggle}
          onLogin={handleLoginClick}
          user={user}
          onFiltersOpen={handleFiltersOpen}
        />
        <main className="MuseMap-Main">
          <Topbar
            theme={theme}
            onThemeToggle={handleThemeToggle}
            user={user}
            onProfileOpen={() => setProfileDrawerOpen(true)}
          />
          <div className="MuseMap-ContentRow">
            <section className="MuseMap-WorldMapSec">
              <WorldMap
                tracks={mapTracks}
                onSelectLocation={handleMapSelect}
                selectedLocation={selectedLocation}
              />
            </section>
            <section className="MuseMap-PlaylistSec">
              <PlaylistSection
                playlist={playlist}
                recommendations={recommendations}
                loading={loadingPlaylist}
                user={user}
                onFiltersOpen={handleFiltersOpen}
              />
            </section>
          </div>
        </main>
        <FiltersDrawer
          open={isFiltersOpen}
          onClose={handleFiltersClose}
          filters={filters}
          onApply={handleFiltersApply}
        />
        <ProfileDrawer
          open={isProfileDrawerOpen}
          user={user}
          onLogout={handleLogout}
          onClose={() => setProfileDrawerOpen(false)}
        />
        <AuthModal
          open={isAuthModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        {/* Responsive overlay disables background when modals open */}
        {(isAuthModalOpen || isFiltersOpen || isProfileDrawerOpen) && (
          <div className="MuseMap-Backdrop" />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
