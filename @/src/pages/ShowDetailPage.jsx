/**
 * ShowDetailPage
 * Displays a single podcast show with metadata and seasons
 */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcastById } from "../api/fetchPodcast";
import SeasonList from "../components/SeasonList";
import { genreMap } from "../utils/genreMap";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/Loading";

export default function ShowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError("");
    setShow(null);

    fetchPodcastById(id)
      .then((data) => {
        // Validate API response
        if (!data || !Array.isArray(data.seasons)) {
          throw new Error("Invalid show data");
        }
        setShow(data);
      })
      .catch((err) => {
        console.error("Show fetch failed:", err);
        setError("Failed to load show");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ---- STATES ----
  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!show) return <p>Show not found.</p>;

  // ---- SAFE DERIVED DATA ----
  const totalEpisodes = show.seasons.reduce(
    (total, season) =>
      total + (season.episodes ? season.episodes.length : 0),
    0
  );

  const genreNames = Array.isArray(show.genres)
    ? show.genres.map((gid) => genreMap[gid]).filter(Boolean)
    : [];

  return (
    <div className="container show-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      {/* HERO SECTION */}
      <div className="show-hero">
        {/* IMAGE */}
        <div className="show-image">
          <img src={show.image} alt={show.title} />
        </div>

        {/* INFO */}
        <div className="show-info">
          <h1>{show.title}</h1>

          <p className="show-description">{show.description}</p>

          <p className="show-meta">
            <strong>Genres:</strong>{" "}
            {genreNames.length ? genreNames.join(" • ") : "N/A"}
          </p>

          <p className="show-meta">
            <strong>Total Episodes:</strong> {totalEpisodes}
          </p>

          <p className="show-meta">
            <strong>Seasons:</strong> {show.seasons.length}
          </p>

          <p className="show-meta">
            <strong>Last updated:</strong> {formatDate(show.updated)}
          </p>
        </div>
      </div>

      {/* SEASONS */}
      <SeasonList seasons={show.seasons} />
    </div>
  );
}
