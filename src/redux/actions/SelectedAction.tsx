import { Dispatch } from 'redux';

// @ts-ignore
import { GET_SELECTED_ITEM } from "ReduxConstants/ActionType";

export const GetSelectedItem = (params: any = {}) => (dispatch: Dispatch<any>) => {
    const { selected } = params
    dispatch({ type: GET_SELECTED_ITEM, selected })
}