import axios from "axios";


const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "baf2c0d59c8f476b8fe2d7345616d037";
const redirectUri = "http://localhost:3000";
const scopes = [ "user-read-email","user-read-email","user-library-read", "playlist-read-private", "playlist-modify-public"];


export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient= axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config){
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};


export default apiClient;