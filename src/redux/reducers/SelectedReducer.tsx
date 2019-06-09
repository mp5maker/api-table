// @ts-ignore
import { GET_SELECTED_ITEM } from "ReduxConstants/ActionType";

interface DefaultStateInterface {
    type: string,
    selected: any
}


const DefaultState = {
    type: "",
    selected: ""
}

export const SelectedReducer = (state = DefaultState, action: DefaultStateInterface) => {
    switch (action.type) {
        case GET_SELECTED_ITEM:
            return { ...state, ...action }
        default:
            return state;
    }
}