// @ts-ignore
import { GET_POST_SUCCESS, GET_POST_ERROR } from "ReduxConstants/ActionType";

// @ts-ignore
import { DefaultState, DefaultStateInterface } from "ReduxConstants/DefaultState"

export const PostReducer = (state = DefaultState, action: DefaultStateInterface) => {
    switch(action.type) {
        case GET_POST_SUCCESS:
            return {...state, ...action }
        case GET_POST_ERROR:
            return {...state, ...action}
        default:
            return state;
    }
}