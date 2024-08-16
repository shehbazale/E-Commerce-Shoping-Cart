import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import themeReducer from "./ThemeSlice";
const rootReducer = combineReducers({
  themeStore: themeReducer,
  cartStore: cartReducer,
});
export default rootReducer;
