import PodcastCard from "./PodcastCard";

/**
 * Displays filtered podcast previews
 */
export default function PodcastGrid({ podcasts, search, onSearch }) {
  const filtered = podcasts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        placeholder="Search podcasts..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </>
  );
}