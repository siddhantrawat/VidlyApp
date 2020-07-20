import http from "./httpService";
import { apiUrl } from "../config.json";
export function getMovies() {
  return http.get(apiUrl + "/movies");
}

export function deleteMovie(movieId) {
  return http.delete(apiUrl + "/movies" + "/" + movieId);
}

export function getMovie(movieId) {
  return http.get(apiUrl + "/movies/" + movieId);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    const url = apiUrl + "/movies/" + movie._id;
    console.log(url);
    return http.put(url, body);
  }
  console.log("no id found");
  return http.post(apiUrl + "/movies", movie);
}
