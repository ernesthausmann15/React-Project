const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "21079115";
const API_URL = "https://www.omdbapi.com/";
const API_DELAY_MS = 650;

// The delay keeps the loading UI observable during development and demos. It
// lives here rather than in pages, so every current and future API call gets
// the same behavior without duplicating timers in React components.
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(
        Object.assign(new Error("Request cancelled."), { name: "AbortError" }),
      );
      return;
    }

    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(
          Object.assign(new Error("Request cancelled."), {
            name: "AbortError",
          }),
        );
      },
      { once: true },
    );
  });
}

async function request(params, signal) {
  const query = new URLSearchParams({ ...params, apikey: API_KEY });
  // Waiting in parallel means the delay never adds time after a slow network
  // response; it simply guarantees a minimum visible skeleton duration.
  const [response] = await Promise.all([
    fetch(`${API_URL}?${query}`, { signal }),
    delay(API_DELAY_MS, signal),
  ]);
  if (!response.ok) throw new Error("The movie service is unavailable.");
  const data = await response.json();
  if (data.Response === "False")
    throw new Error(data.Error || "No movie data found.");
  return data;
}

// Keeping network code in one module makes pages easier to test and replace with
// a real backend later without changing presentation components.
export const searchMovies = (query, page = 1) => request({ s: query, page });
export const getMovie = (id, signal) =>
  request({ i: id, plot: "full" }, signal);
export const searchByDirector = (director, signal) =>
  request({ s: director, type: "movie" }, signal);
