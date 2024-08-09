import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./ThemeSlice";
import cartReducer from "./CartSlice";

const persistConfig = {
  key: "root",
  storage,
};
// const persistedReducer = persistReducer(persistConfig, themeReducer);
const persistedReducer = persistReducer(persistConfig, cartReducer);
const store = configureStore({
  reducer: persistedReducer,
  //   reducer: { theme: persistedReducer },
});
let persistor = persistStore(store);

export { store, persistor };
