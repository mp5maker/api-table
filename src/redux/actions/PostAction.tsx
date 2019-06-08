import { Dispatch } from 'redux';

// @ts-ignore
import { GET_POST_SUCCESS, GET_POST_ERROR }  from "ReduxConstants/ActionType";

// @ts-ignore
import { ApiHelper } from "Api/ApiHelper"

export const GetPostAction = (params: any = {}) => (dispatch: Dispatch<any>) => {
    const onSuccess = (response: any): void => {
        const { next, previous } = response.headers['link'].split(',').reduce((newObj: any, perHeaderItem: any) => {
            if (perHeaderItem.indexOf(`rel="prev"`) > -1) {
                return {
                    ...newObj,
                    previous: perHeaderItem.trim().replace(`>; rel="prev"`, '').replace('<', '')
                };
            }
            if (perHeaderItem.indexOf(`rel="next"`) > -1) {
                return {
                    ...newObj,
                    next: perHeaderItem.trim().replace(`>; rel="next"`, '').replace('<', '')
                };
            }
            return newObj;
        }, { next: null, previous: null })

        const limit = response.config.params._limit ? parseInt(response.config.params._limit) : 20;
        const current = response.config.params._page ? parseInt(response.config.params._page) : 1;
        const count = current ? current * limit : limit;
        const total = response.headers["x-total-count"];

        dispatch({
            type: GET_POST_SUCCESS,
            data: {
                ...response,
                next,
                previous,
                current,
                count,
                total,
                limit,
                next_page_number: next ? current + 1 : null,
                previous_page_number: previous ? current - 1 : null,
            },
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