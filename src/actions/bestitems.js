import { BEST_ITEMS_FETCHED } from "../types";
import api from "../api";

const bestitemsFetched = data => ({
  type: BEST_ITEMS_FETCHED,
  data
});


export const fetchBest = () => dispatch =>
  api.news
    .fetchBestItems()
    .then(data => dispatch(bestitemsFetched(data)));