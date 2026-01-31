import { useState } from "react";

export default function SeasonList({ seasons }) {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  return (
    <div className="season-section">
      {/* Season Header */}
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

      {/* Episodes */}
      <div className="episode-list">
        {selectedSeason.episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <img
              src={episode.image}
              alt={episode.title}
              className="episode-image"
            />

            <div className="episode-info">
              <h4>
                Episode {episode.episode}: {episode.title}
              </h4>
              <p>
                {episode.description.length > 120
                  ? episode.description.slice(0, 120) + "..."
                  : episode.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}