import React, { useState } from "react";
const ACTIVITIES = ["Workout", "Study", "Party", "Relax"];
const LANGUAGES = ["English", "Spanish", "French", "Mandarin", "Arabic"];
const TIMES = ["Morning", "Afternoon", "Evening", "Night"];

/**
 * FiltersDrawer opens as a drawer over content for filter selection.
 */
// PUBLIC_INTERFACE
const FiltersDrawer = ({ open, onClose, filters, onApply }) => {
  const [activity, setActivity] = useState(filters.activity || "");
  const [language, setLanguage] = useState(filters.language || "");
  const [timeOfDay, setTimeOfDay] = useState(filters.timeOfDay || "");

  // Sync with external filters
  React.useEffect(() => {
    setActivity(filters.activity || "");
    setLanguage(filters.language || "");
    setTimeOfDay(filters.timeOfDay || "");
  }, [filters]);

  function handleSubmit(e) {
    e.preventDefault();
    onApply({ activity, language, timeOfDay });
  }

  return (
    <div className={`MuseMap-FiltersDrawer${open ? " open" : ""}`}>
      <form className="MuseMap-FiltersForm" onSubmit={handleSubmit}>
        <h2>Filters</h2>
        <label>
          Activity:
          <select value={activity} onChange={e => setActivity(e.target.value)}>
            <option value="">Any</option>
            {ACTIVITIES.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </label>
        <label>
          Language:
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="">Any</option>
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </label>
        <label>
          Time of Day:
          <select value={timeOfDay} onChange={e => setTimeOfDay(e.target.value)}>
            <option value="">Any</option>
            {TIMES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <div className="MuseMap-Filters-Actions">
          <button
            type="button"
            className="MuseMap-Filters-Cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="MuseMap-Filters-Apply">
            Apply
          </button>
        </div>
      </form>
      <div className="MuseMap-Filters-Backdrop" onClick={onClose} />
    </div>
  );
};

export default FiltersDrawer;
