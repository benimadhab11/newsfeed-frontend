import { createSelector } from "reselect";
import { BEST_ITEMS_FETCHED } from "../types";

export default function items(state = {}, action = {}) {
  switch (action.type) {
    case BEST_ITEMS_FETCHED:
    	return state;
    default:
      return state;
  }
}

// SELECTORS

export const itemsSelector = state => state.bestitems;

export const allItemsSelector = createSelector(itemsSelector, itemsHash =>
  Object.values(itemsHash)
);
