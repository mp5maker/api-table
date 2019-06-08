import { Dispatch } from 'redux';

// @ts-ignore
import { GET_POST_SUCCESS, GET_POST_ERROR }  from "ReduxConstants/ActionType";

// @ts-ignore
import { ApiHelper } from "Api/ApiHelper"

export const GetPostAction = (params: any = {}) => (dispatch: Dispatch<any>) => {
    const onSuccess = (response: any): void => {
        dispatch({
            type: GET_POST_SUCCESS,
            data: response,
            loading: false,
            status: "success"
        });
    };

    const onError = (error: any) => {
        dispatch({
            type: GET_POST_ERROR,
            data: error.response,
            loading: false,
            status: "error"
        });
    };

    ApiHelper.posts(params).then(onSuccess).catch(onError);
}