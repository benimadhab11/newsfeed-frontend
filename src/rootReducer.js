import { combineReducers } from "redux";

import user from "./reducers/user";
import items from "./reducers/items";
import bestitems from "./reducers/bestitems";

export default combineReducers({
  user,
  items,
  bestitems
});
