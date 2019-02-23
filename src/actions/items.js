import { ITEMS_FETCHED, ITEM_CREATED } from "../types";
import api from "../api";

const itemsFetched = data => ({
  type: ITEMS_FETCHED,
  data
});


const itemCreated = () => ({
  type: ITEM_CREATED
});

export const fetchItems = () => dispatch =>
  api.news
    .fetchAll()
    .then(data => dispatch(itemsFetched(data)));



export const createItem = (userrating,guidObject) => dispatch =>
  api.news
    .create(userrating,guidObject)
    .then(user => {
      dispatch(itemCreated());
    });