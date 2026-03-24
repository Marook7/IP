import { useState } from "react";

function MovieCard({ movie, onRemove, onRate, onReviewChange }) {
  return (
      <div style={styles.card}>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>{movie.title}</h3>
          <button onClick={() => onRemove(movie.id)} style={styles.removeBtn}>
            Remove
          </button>
        </div>

        {/* Star rating - clicking a star calls onRate with the star number */}
        <div style={{ margin: "10px 0" }}>
          {[1, 2, 3, 4, 5].map((star) => (
              <span
                  key={star}
                  onClick={() => onRate(movie.id, star)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
              >
            {star <= movie.rating ? "⭐" : "☆"}
          </span>
          ))}
        </div>

        {/* Review text area */}
        <textarea
            value={movie.review}
            onChange={(e) => onReviewChange(movie.id, e.target.value)}
            placeholder="Write a review..."
            style={styles.textarea}
        />

      </div>
  );
}


export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  function addMovie() {
    if (!title.trim()) return;
    const newMovie = { id: Date.now(), title: title, rating: 0, review: "" };
    setMovies([...movies, newMovie]);
    setTitle("");
  }

  function removeMovie(id) {
    setMovies(movies.filter((m) => m.id !== id));
  }

  function rateMovie(id, rating) {
    setMovies(movies.map((m) => (m.id === id ? { ...m, rating: rating } : m)));
  }

  function updateReview(id, review) {
    setMovies(movies.map((m) => (m.id === id ? { ...m, review: review } : m)));
  }

  return (
      <div style={styles.container}>
        <h1>Movie Watchlist</h1>

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title..."
              style={styles.input}
          />
          <button onClick={addMovie} style={styles.addBtn}>Add</button>
        </div>

        {movies.length === 0 && (
            <p style={{ color: "#aaa" }}>No movies yet. Add one above!</p>
        )}

        {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onRemove={removeMovie}
                onRate={rateMovie}
                onReviewChange={updateReview}
            />
        ))}
      </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Georgia, serif",
    padding: "0 16px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    
  },
  addBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#fafafa",
  },
  removeBtn: {
    border: "1px solid #e55",
    color: "#e55",
    backgroundColor: "transparent",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    height: "60px",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    resize: "vertical",
  },
};
