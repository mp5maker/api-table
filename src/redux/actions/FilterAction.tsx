import { Dispatch } from 'redux';

// @ts-ignore
import { FILTER_ITEMS } from "ReduxConstants/ActionType";

export const FilterAction = (params: any = {}) => (dispatch: Dispatch<any>) => {
    const { sort, order, pageSize } = params
    dispatch({ type: FILTER_ITEMS, sort, order, pageSize })
}