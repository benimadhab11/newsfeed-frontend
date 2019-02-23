import { createSelector } from "reselect";
import { ITEMS_FETCHED, ITEM_CREATED } from "../types";

export default function books(state = {}, action = {}) {
  switch (action.type) {
    case ITEMS_FETCHED:
    case ITEM_CREATED:
      return { ...state, ...action.data};
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.items;

export const allBooksSelector = createSelector(booksSelector, booksHash =>
  Object.values(booksHash)
);
