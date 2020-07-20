import http from "./httpService";
import { apiUrl } from "../config.json";
function getGenres() {
  console.log("connecting to server");
  return http.get(apiUrl + "/genres");
}

export default getGenres;
