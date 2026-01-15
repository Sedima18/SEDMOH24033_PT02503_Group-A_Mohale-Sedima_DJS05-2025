/**
 * Episode preview
 */
export default function EpisodeCard({ episode, number, image }) {
  return (
    <div className="episode">
      <img src={image} alt={episode.title} />
      <h4>
        Episode {number}: {episode.title}
      </h4>
      <p>{episode.description.slice(0, 120)}...</p>
    </div>
  );
}