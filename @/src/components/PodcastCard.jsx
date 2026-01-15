import { Link, useLocation } from "react-router-dom";

/**
 * Single podcast preview card
 */
export default function PodcastCard({ podcast }) {
  const location = useLocation();

  return (
    <Link to={`/show/${podcast.id}${location.search}`} className="card">
      <img src={podcast.image} alt={podcast.title} />
      <h3>{podcast.title}</h3>
    </Link>
  );
}