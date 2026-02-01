/**
 * SeasonList
 * ----------
 * Displays a dropdown to select a season and
 * renders episodes for the selected season.
 * Each episode includes an image and description.
 */

import { useEffect, useState } from "react";

export default function SeasonList({ seasons }) {
  /** Currently selected season */
  const [selectedSeason, setSelectedSeason] = useState(null);

  /**
   * Set default season when seasons load
   */
  useEffect(() => {
    if (Array.isArray(seasons) && seasons.length > 0) {
      setSelectedSeason(seasons[0]);
    }
  }, [seasons]);

  if (!selectedSeason) return null;

  return (
    <div className="season-section">
      {/* SEASON HEADER */}
      <div className="season-header">
        <h2>Season</h2>

        <select
          value={selectedSeason.id}
          onChange={(e) =>
            setSelectedSeason(
              seasons.find(
                (season) => season.id === Number(e.target.value)
              )
            )
          }
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.title} ({season.episodes.length} episodes)
            </option>
          ))}
        </select>
      </div>

      {/* EPISODES */}
      <div className="episode-list">
        {selectedSeason.episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            {/* Episode Image */}
            <img
              src={episode.image || "/episode-placeholder.png"}
              alt={episode.title}
              className="episode-image"
            />

            <div className="episode-info">
              <h4>
                Episode {episode.episode}: {episode.title}
              </h4>

              <p>
                {episode.description.length > 140
                  ? episode.description.slice(0, 140) + "…"
                  : episode.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
