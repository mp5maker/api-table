import { combineReducers } from "redux"

import { PostReducer } from  "./PostReducer";
import { SelectedReducer } from "./SelectedReducer";

export const RootReducer = combineReducers({
    posts: PostReducer,
    selected: SelectedReducer
})