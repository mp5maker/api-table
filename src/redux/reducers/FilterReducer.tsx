// @ts-ignore
import { FILTER_ITEMS } from "ReduxConstants/ActionType";

interface DefaultStateInterface {
    type: string,
    sort: string,
    order: string,
    pageSize: number
}

const DefaultState = {
    type: "",
    sort: "id",
    order: "asc",
    pageSize: 20
}

export const FilterReducer = (state = DefaultState, action: DefaultStateInterface) => {
    switch (action.type) {
        case FILTER_ITEMS:
            return { ...state, ...action }
        default:
            return state;
    }
}