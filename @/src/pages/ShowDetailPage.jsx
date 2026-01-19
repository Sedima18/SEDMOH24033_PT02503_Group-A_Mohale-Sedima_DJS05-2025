import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcast";
import SeasonList from "../components/SeasonList";
import { genreMap } from "../utils/genreMap";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/Loading";

export default function ShowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPodcastById(id)
      .then(setShow)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="show-page">
      <button onClick={() => navigate(`/${location.search}`)}>
        ← Back
      </button>

      <img src={show.image} alt={show.title} />
      <h1>{show.title}</h1>
      <p>{show.description}</p>

      <div className="genres">
        {show.genres.map((id) => (
          <span key={id}>{genreMap[id]}</span>
        ))}
      </div>

      <p>Last updated: {formatDate(show.updated)}</p>

      <SeasonList seasons={show.seasons} />
    </div>
  );
}