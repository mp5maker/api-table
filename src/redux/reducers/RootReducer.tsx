import { combineReducers } from "redux"

import { PostReducer } from  "./PostReducer";

export const RootReducer = combineReducers({
    posts: PostReducer,
})