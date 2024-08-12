import axios from "axios";

const API_KEY = "l3JrmJQJQSy4F734yRzRLIggNwdsB6O_CUVEfjDxA7g";
axios.defaults.baseURL = "https://api.unsplash.com";

axios.defaults.params = {
  orientation: "landscape",
  per_page: 10,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `/search/photos?client_id=${API_KEY}&query=${query}&page=${page}`
  );

  return data;
};