import { combineReducers } from "redux"

import { PostReducer } from  "./PostReducer";
import { SelectedReducer } from "./SelectedReducer";
import { FilterReducer } from "./FilterReducer";

export const RootReducer = combineReducers({
    posts: PostReducer,
    selected: SelectedReducer,
    filter: FilterReducer
})