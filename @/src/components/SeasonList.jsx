/**
 * SeasonList
 * ----------
 * Displays expandable seasons with episode lists.
 * Each episode shows:
 * - Episode number
 * - Episode title
 * - Season image (API does not provide episode-specific images)
 * - Shortened description
 */

import { useState } from "react";

export default function SeasonList({ seasons }) {
  /** Currently expanded season ID */
  const [openSeasonId, setOpenSeasonId] = useState(null);

  if (!Array.isArray(seasons) || seasons.length === 0) return null;

  return (
    <div className="season-section">
      {seasons.map((season) => {
        const isOpen = openSeasonId === season.id;

        return (
          <div key={season.id} className="season-block">
            {/* SEASON HEADER */}
            <button
              className="season-toggle"
              onClick={() => setOpenSeasonId(isOpen ? null : season.id)}
            >
              <h3>{season.title}</h3>
              <span>{season.episodes.length} episodes</span>
            </button>

            {/* EPISODES */}
            {isOpen && (
              <div className="episode-list">
                {season.episodes.map((episode) => (
                  <div key={episode.id} className="episode-card">
                    {/* Use season image for each episode */}
                    <img
                      src={season.image || "/episode-placeholder.png"}
                      alt={season.title}
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
            )}
          </div>
        );
      })}
    </div>
  );
}