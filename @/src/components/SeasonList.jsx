import { useState } from "react";
import EpisodeCard from "./EpisodeCard";

/**
 * Expandable season navigation
 */
export default function SeasonList({ seasons }) {
  const [open, setOpen] = useState(null);

  return seasons.map((season, index) => (
    <div key={season.id}>
      <button onClick={() => setOpen(open === index ? null : index)}>
        {season.title} ({season.episodes.length})
      </button>

      {open === index &&
        season.episodes.map((ep, i) => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            number={i + 1}
            image={season.image}
          />
        ))}
    </div>
  ));
}
