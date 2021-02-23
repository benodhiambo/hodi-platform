import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

export const appStore = createStore(rootReducer);