import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./ThemeSlice";
import cartReducer from "./CartSlice";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};
// const persistedReducer = persistReducer(persistConfig, themeReducer); // only for change theme
// const persistedReducer = persistReducer(persistConfig, cartReducer);   // for single cart
const persistedReducer = persistReducer(persistConfig, rootReducer); // to handle both cart and theme

const store = configureStore({
  reducer: persistedReducer,
  //   reducer: { theme: persistedReducer },
});
let persistor = persistStore(store);

export { store, persistor };
